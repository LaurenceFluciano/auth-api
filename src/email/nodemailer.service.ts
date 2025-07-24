import nodemailer, { Transporter } from "nodemailer";
import { SendEmailStrategy, EmailBody, EmailProvidersType } from "src/email/email.strategy";

const { GMAIL_SMTP_TRANSPORTER, OUTLOOK_SMTP_TRANSPORTER, SMTP_PORT, SMTP_USER, SMTP_PASS, NODE_ENV } = process.env;

if (
    !GMAIL_SMTP_TRANSPORTER || 
    !OUTLOOK_SMTP_TRANSPORTER ||
    !SMTP_PORT || 
    !SMTP_USER || 
    !SMTP_PASS
    ) {
  throw new Error("Ambient SMTP var incomplete");
}

export class SendEmailNodemailerService implements SendEmailStrategy {
    private providers: Record<EmailProvidersType, any> = {
        "gmail": GMAIL_SMTP_TRANSPORTER,
        "outlook": OUTLOOK_SMTP_TRANSPORTER
    }

    private transporter: Transporter; 

    constructor(context: EmailProvidersType)
    {
        this.transporter = nodemailer.createTransport({
        host: this.providers[context],
        port: parseInt(SMTP_PORT || "587", 10),
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
    }
    
    async sendEmail(message: EmailBody): Promise<void> {
        const info = await this.transporter.sendMail({
            from: message.from,
            to: message.to,
            subject: message.subject,
            text: message.text, 
            html: message.html, 
        })

        if (NODE_ENV !== "production") {
            console.log("Message sent:", info.messageId);
        }
    }
}

