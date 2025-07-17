import { Injectable } from "@nestjs/common";
import nodemailer, { Transporter } from "nodemailer";
import { SendEmailService, EmailBody } from "src/domain/ports/email.strategy";

const { GMAIL_SMTP_TRANSPORTER, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

if (!GMAIL_SMTP_TRANSPORTER || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  throw new Error("Ambient SMTP var incomplete");
}

@Injectable()
export class SendGmailNodemailerService implements SendEmailService {
    private transporter: Transporter = nodemailer.createTransport({
        host: GMAIL_SMTP_TRANSPORTER,
        port: parseInt(SMTP_PORT || "587", 10),
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
    
    async sendEmail(message: EmailBody): Promise<void> {
        const info = await this.transporter.sendMail({
            from: message.from,
            to: message.to,
            subject: message.subject,
            text: message.text, 
            html: message.html, 
        })

        console.log("Message sent:", info.messageId);
    }
}

