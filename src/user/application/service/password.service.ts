import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CacheCodeEntity } from "src/cache/domain/cache.code.entity";

/* DTOs */
import { RecoveryCodeDTO } from "src/user/application/dtos/password.dto";
import { GetByCredentialsDTO, GetUserIdDTO } from "src/user/application/dtos/get.dto";

/* Services */
import { GetUserService } from "./get.service";

/* Repository Ports and adapter */
import { EncryptStrategy } from "src/utils/interface/crypto/encrypt";
import { ENCRYPT_TOKEN } from "src/utils/interface/crypto/encrypt.token";

import { UserUpdateRepository } from "src/user/domain/interface/repository";
import { USER_UPDATE_REPOSITORY } from "src/user/domain/interface/repository.token";

import { GenerateCodeStrategy } from "src/utils/interface/code/recovery.code";
import { GENERATE_CODE_STRATEGY } from "src/utils/interface/code/recovery.code.token";

import { CacheStrategyService } from "src/cache/domain/interface/cache.strategy";
import { CACHE_TOKEN } from "src/cache/domain/interface/cache.token";

// EXTERNAL LAYER
import { CONTEXT_SEND_EMAIL_TOKEN } from "src/email/interfaces/email.token";
import { ContextEmailStrategy } from "src/email/interfaces/email.strategy";

import { EmailProviderResolver } from "src/email/context/email.provider.resolve";
import { Email } from "src/user/domain/domain-types/Email";
import { ProjectKey } from "src/user/domain/domain-types/ProjectKey";
import { Password } from "src/user/domain/domain-types/Password";

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
        @Inject(CACHE_TOKEN)
        private readonly cacheService: CacheStrategyService<CacheCodeEntity,CacheCodeEntity>,
        @Inject(GENERATE_CODE_STRATEGY)
        private readonly generateCode: GenerateCodeStrategy,
        @Inject(ENCRYPT_TOKEN)
        private readonly encryptService: EncryptStrategy
    ){
        this.cacheService.init();
    }

    async sendRecoveryCode(dto: GetByCredentialsDTO): Promise<void>
    {
        const user = await this.getUserService.getUserByCredentials(dto);

        if(user.password === undefined)
            throw new BadRequestException("This context application don't have password auth.")
        
        const code = this.generateCode.generate()
        
        const isCacheGenerated = await this.cacheService.set(
            user.id, 
            new CacheCodeEntity(code,user.projectKey)
        )

        if(!isCacheGenerated)
            throw new InternalServerErrorException("Could not store recovery code")
        

        if (!SMTP_USER) 
            throw new InternalServerErrorException("Envioroment USER SMTP not defined. Impossible to send code.");
        

        const provider = EmailProviderResolver.resolveProvider(user.email);

        if(provider === null)
            throw new InternalServerErrorException("Unable to resolve email provider for the given address.");

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
        const password = new Password(dtoRecoveryCode.newPassword);
        const confirmPassword = new Password(dtoRecoveryCode.confirmNewPassword);

        const cacheUser = await this.cacheService.get(dtoId.id);

        if (!cacheUser || cacheUser.code !== dtoRecoveryCode.code) 
            throw new BadRequestException("Invalid code or expired.");

        Password.match(password, confirmPassword);
        const hash = await password.generateHash(this.encryptService);

        await this.repository.updatePassword(dtoId.id,hash);


        await this.cacheService.del([dtoId.id]);

        return { message: "Senha redefinida com sucesso." };
    }
}