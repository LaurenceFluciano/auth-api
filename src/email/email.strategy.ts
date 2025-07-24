export type EmailBody = {
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string
}

export type EmailProvidersType = 'gmail' | 'outlook';

export interface SendEmailStrategy {
    sendEmail(mesage: EmailBody): Promise<void>
}

export interface ContextEmailStrategy {
    executeSendEmail(message: EmailBody, provider: EmailProvidersType): Promise<void>
}
