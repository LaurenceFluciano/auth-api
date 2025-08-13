import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CacheCodeEntity } from "src/cache/infrastructure/password.cache.entities";

/* DTOs */
import { RecoveryCodeDTO } from "src/user/dto/user.password.dto";
import { GetByCredentialsDTO, GetUserIdDTO } from "src/user/dto/get.user.dto";

/* Services */
import { GetUserService } from "./get.user.service";

/* Repository Ports and adapter */
import { EncryptStrategy } from "src/shared/interfaces/crypto/encrypt";
import { ENCRYPT_TOKEN } from "src/shared/interfaces/crypto/encrypt.token";

import { UserUpdateRepository } from "src/user/domain/interfaces/user.repository";
import { USER_UPDATE_REPOSITORY } from "src/user/domain/interfaces/user.repository.token";

import { GenerateCodeStrategy } from "src/shared/interfaces/code/recovery.code";
import { GENERATE_CODE_STRATEGY } from "src/shared/interfaces/code/recovery.code.token";

import { UserValidation } from "src/user/domain/validations/validation";
import { USER_VALIDATION } from "src/user/domain/validations/validations.token";

import { CacheStrategyService } from "src/cache/interface/cache.strategy";
import { CACHE_TOKEN } from "src/cache/interface/cache.token";

// EXTERNAL LAYER
import { CONTEXT_SEND_EMAIL_TOKEN } from "src/email/interfaces/email.token";
import { ContextEmailStrategy } from "src/email/interfaces/email.strategy";

import { EmailProviderResolver } from "src/email/context/email.provider.resolve";

// .ENV
const { SMTP_USER } = process.env;

@Injectable()
export class UserPasswordService {
    constructor(
        private readonly getUserService: GetUserService,
        @Inject(USER_UPDATE_REPOSITORY)
        private readonly repository: UserUpdateRepository,
        @Inject(CONTEXT_SEND_EMAIL_TOKEN)
        private readonly sendEmailService: ContextEmailStrategy,
        @Inject(USER_VALIDATION)
        private readonly userValidation: UserValidation,
        @Inject(CACHE_TOKEN)
        private readonly cacheService: CacheStrategyService<CacheCodeEntity,CacheCodeEntity>,
        @Inject(GENERATE_CODE_STRATEGY)
        private readonly generateCode: GenerateCodeStrategy,
        @Inject(ENCRYPT_TOKEN)
        private readonly encryptService: EncryptStrategy
    ){}

    async sendRecoveryCode(dto: GetByCredentialsDTO): Promise<void>
    {
        if(!this.userValidation.isValidEmail(dto.email)){
            throw new NotFoundException("User not found");
        }
        if(!this.userValidation.isValidProjectKey(dto.projectKey)){
            throw new NotFoundException("User not found");
        }

        const user = await this.getUserService.getUserByCredentials(dto);

        if(user.password === undefined)
        {
            throw new BadRequestException("This context application don't have password auth.")
        }
        const code = this.generateCode.generate()
        
        await this.cacheService.init()
        const isCacheGenerated = this.cacheService.set(
            user.id, 
            new CacheCodeEntity(code,user.projectKey)
        )

        if(!isCacheGenerated)
        {
            throw new InternalServerErrorException("Could not store recovery code")
        }

        if (!SMTP_USER) {
            throw new InternalServerErrorException("Envioroment USER SMTP not defined. Impossible to send code.");
        }

        const provider = EmailProviderResolver.resolveProvider(user.email);

        if(provider === null)
        {
            throw new InternalServerErrorException("Unable to resolve email provider for the given address.");
        }

        this.sendEmailService.executeSendEmail({
            from: SMTP_USER,
            subject: "Recovery Code",
            text: `Hello ${user.name}, your recovery code is: ${code}`,
            to:  user.email
        }, provider)
    }


    async recoveryPassword(
        dtoId: GetUserIdDTO,
        dtoRecoveryCode: RecoveryCodeDTO,
    ): Promise<{ message: string }> {
        if(!this.userValidation.isValidPassword(dtoRecoveryCode.newPassword))
        {
            throw new BadRequestException("Invalid password format.");
        }

        await this.cacheService.init()
        const cacheUser = await this.cacheService.get(dtoId.id);

        if (!cacheUser || cacheUser.code !== dtoRecoveryCode.code) {
            throw new NotFoundException("Invalid code or expired.");
        }


        if(dtoRecoveryCode.newPassword === dtoRecoveryCode.confirmNewPassword)
        {
            const hash = await this.encryptService.hash(dtoRecoveryCode.newPassword);
            await this.repository.updatePassword(dtoId.id,hash);
        } else {
            this.cacheService.del([dtoId.id]);
            throw new BadRequestException("Invalid password generate a new code to try again.")
        }
        this.cacheService.del([dtoId.id]);

        return { message: "Senha redefinida com sucesso." };
    }
}