import { Module } from "@nestjs/common";
import { SEND_EMAIL_SERVICE } from "src/domain/ports/email.strategy";
import { SendGmailNodemailerService } from "./nodemailer.service";


@Module({
    providers: [
        {
            provide: SEND_EMAIL_SERVICE,
            useClass: SendGmailNodemailerService
        }
    ],
    exports: [SEND_EMAIL_SERVICE]
})
export class EmailServiceModule {

}