export type EmailBody = {
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string
}

export interface SendEmailService {
    sendEmail(message: EmailBody): void   
}

export const SEND_EMAIL_SERVICE = "SEND_EMAIL_SERVICE"