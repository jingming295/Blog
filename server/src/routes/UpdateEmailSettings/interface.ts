export interface setting_emailFromUser{
    id:number;
    senderName: string | null;
    senderEmail: string | null;
    smtpServer: string | null;
    smtpPort: number | null;
    smtpUsername: string | null;
    smtpPassword: string | null;
    replyEmail: string | null;
    forceSSL: number;
}