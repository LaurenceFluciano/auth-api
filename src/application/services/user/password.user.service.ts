import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetByCredentialsDTO } from "src/application/dtos/users/get.user.dto";
import { SEND_EMAIL_SERVICE, SendEmailService } from "src/domain/ports/email.strategy";
import { AbstractUserExternalValidation } from "src/domain/ports/validation.interface";
import { USER_VALIDATION } from "src/domain/ports/validations.ports";
import { GetUserService } from "./get.user.service";
import { CACHE_SERVICE, CacheStrategyService } from "src/domain/ports/cache.strategy";
import { CacheCodeEntity } from "src/domain/entities/password.cache.entities";
import { GENERATE_CODE_STRATEGY, GenerateCodeStrategy } from "src/domain/ports/recovery.code.strategy";

// FOR TEST
const { SMTP_USER } = process.env;

@Injectable()
export class UserPasswordService {
    constructor(
        private readonly getUserService: GetUserService,
        @Inject(SEND_EMAIL_SERVICE)
        private readonly sendEmailService: SendEmailService,
        @Inject(USER_VALIDATION)
        private readonly userValidation: AbstractUserExternalValidation,
        @Inject(CACHE_SERVICE)
        private readonly cacheService: CacheStrategyService<CacheCodeEntity,CacheCodeEntity>,
        @Inject(GENERATE_CODE_STRATEGY)
        private readonly generateCode: GenerateCodeStrategy
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
            user.projectKey, 
            new CacheCodeEntity(code,user.id,user.projectKey)
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
}