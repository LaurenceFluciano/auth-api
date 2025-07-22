import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetByCredentialsDTO, GetUserIdDTO } from "src/application/dtos/users/get.user.dto";
import { SEND_EMAIL_SERVICE, SendEmailService } from "src/domain/ports/email.strategy";
import { AbstractUserExternalValidation } from "src/domain/ports/validation.interface";
import { USER_VALIDATION } from "src/domain/ports/validations.ports";
import { GetUserService } from "./get.user.service";
import { CACHE_SERVICE, CacheStrategyService } from "src/domain/ports/cache.strategy";
import { CacheCodeEntity } from "src/domain/entities/password.cache.entities";
import { GENERATE_CODE_STRATEGY, GenerateCodeStrategy } from "src/domain/ports/recovery.code.strategy";
import { RecoveryCodeDTO } from "src/application/dtos/users/user.password.dto";
import { EncryptService } from "src/infrastructure/utils/crypto.abstract";
import { USER_UPDATE_REPOSITORY } from "src/domain/ports/repositories/user.repository.ports";
import { UserUpdateRepository } from "src/domain/ports/repositories/user.repository";

// FOR TEST
const { SMTP_USER } = process.env;

@Injectable()
export class UserPasswordService {
    constructor(
        private readonly getUserService: GetUserService,
        @Inject(USER_UPDATE_REPOSITORY)
        private readonly repository: UserUpdateRepository,
        @Inject(SEND_EMAIL_SERVICE)
        private readonly sendEmailService: SendEmailService,
        @Inject(USER_VALIDATION)
        private readonly userValidation: AbstractUserExternalValidation,
        @Inject(CACHE_SERVICE)
        private readonly cacheService: CacheStrategyService<CacheCodeEntity,CacheCodeEntity>,
        @Inject(GENERATE_CODE_STRATEGY)
        private readonly generateCode: GenerateCodeStrategy,
        @Inject(EncryptService)
        private readonly encryptService: EncryptService
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

        const isCacheGenerated = this.cacheService.set(
            user.id, 
            new CacheCodeEntity(code,user.projectKey)
        )

        if(!isCacheGenerated)
        {
            throw new InternalServerErrorException("Could not store recovery code")
        }

        // FOR TEST
        if (!SMTP_USER) {
            throw new Error("Ambient SMTP var incomplete");
        }

        this.sendEmailService.sendEmail({
            from: SMTP_USER,
            subject: "Recovery Code",
            text: `Hello ${user.name}, your recovery code is: ${code}`,
            to:  SMTP_USER
        })
    }


    async recoveryPassword(
        dtoId: GetUserIdDTO,
        dtoRecoveryCode: RecoveryCodeDTO,
    ): Promise<{ message: string }> {
    if(!this.userValidation.isValidPassword(dtoRecoveryCode.newPassword))
    {
        throw new BadRequestException("Invalid password format.");
    }

    const cacheUser = this.cacheService.get(dtoId.id);

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