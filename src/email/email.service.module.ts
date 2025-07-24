import { Module } from "@nestjs/common";
import { CONTEXT_SEND_EMAIL_TOKEN } from "src/email/email.token";
import { ContextEmailService } from "./context.send.email";

@Module({
    providers: [
        {
            provide: CONTEXT_SEND_EMAIL_TOKEN,
            useClass: ContextEmailService
        }
    ],
    exports: [CONTEXT_SEND_EMAIL_TOKEN]
})
export class EmailServiceModule {

}