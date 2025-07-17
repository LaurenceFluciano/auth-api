import { Inject, Injectable } from "@nestjs/common";
import { SEND_EMAIL_SERVICE, SendEmailService } from "src/domain/ports/email.strategy";

@Injectable()
class UserResetPasswordService {
    constructor(
        @Inject(SEND_EMAIL_SERVICE)
        private readonly sendEmailService: SendEmailService 
    ){}

    sendRecoveryCode()
    {
        
    }
}