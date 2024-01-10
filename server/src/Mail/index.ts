import nodemailer from 'nodemailer';
import { DBSelect } from '../SQL/dbSelect';
import { MailFormat } from './MailFormat';

export class Mail
{
    async sendTestEmail(ToEmail:string)
    {
        const dbSelect = new DBSelect();
        const EmailSettings = await dbSelect.selectSettingSendEmail();
        if (EmailSettings.length === 0)
        {
            return 'Please set email setting first';
        }
        const emailSetting = EmailSettings[0];

        if (
            emailSetting.s_SE_id === null ||
            emailSetting.s_SE_forceSSL === null ||
            emailSetting.s_SE_replyEmail === null ||
            emailSetting.s_SE_senderEmail === null ||
            emailSetting.s_SE_senderName === null ||
            emailSetting.s_SE_smtpPassword === null ||
            emailSetting.s_SE_smtpPort === null ||
            emailSetting.s_SE_smtpServer === null ||
            emailSetting.s_SE_smtpUsername === null
        )
        {
            return 'Please set email setting first';
        }

        let secure = emailSetting.s_SE_forceSSL === 0 ? false : true;
        let port = secure ? 465 : emailSetting.s_SE_smtpPort;
        let transporter = nodemailer.createTransport({
            host: emailSetting.s_SE_smtpServer,
            port: port,
            secure: secure, // true for 465, false for other ports
            auth: {
                user: emailSetting.s_SE_smtpUsername, // your SMTP username
                pass: emailSetting.s_SE_smtpPassword // your SMTP password
            }
        });

        let info = await transporter.sendMail({
            from: `${emailSetting.s_SE_senderName} ${emailSetting.s_SE_senderEmail}`, // sender address
            to: ToEmail, // list of receivers
            subject: 'Test Email', // Subject line
            text: 'This is a test email', // plain text body
            html: '<p>This is a test email</p>' // HTML body
        });
        return 'Send Test Email Success'
        
    }

    async sendActivateAccountEmail(ToEmail:string, token:string){
        const dbSelect = new DBSelect();
        const EmailSettings = await dbSelect.selectSettingSendEmail();
        if (EmailSettings.length === 0)
        {
            return 'Please set email setting first';
        }
        const emailSetting = EmailSettings[0];

        if (
            emailSetting.s_SE_id === null ||
            emailSetting.s_SE_forceSSL === null ||
            emailSetting.s_SE_replyEmail === null ||
            emailSetting.s_SE_senderEmail === null ||
            emailSetting.s_SE_senderName === null ||
            emailSetting.s_SE_smtpPassword === null ||
            emailSetting.s_SE_smtpPort === null ||
            emailSetting.s_SE_smtpServer === null ||
            emailSetting.s_SE_smtpUsername === null
        )
        {
            return 'Please set email setting first';
        }

        let secure = emailSetting.s_SE_forceSSL === 0 ? false : true;
        let port = secure ? 465 : emailSetting.s_SE_smtpPort;
        const mailFormat = new MailFormat();
        const mailContent = mailFormat.RegisterMailFormat(ToEmail, token);
        let transporter = nodemailer.createTransport({
            host: emailSetting.s_SE_smtpServer,
            port: port,
            secure: secure, // true for 465, false for other ports
            auth: {
                user: emailSetting.s_SE_smtpUsername, // your SMTP username
                pass: emailSetting.s_SE_smtpPassword // your SMTP password
            }
        });

        let info = await transporter.sendMail({
            from: `${emailSetting.s_SE_senderName} ${emailSetting.s_SE_senderEmail}`, // sender address
            to: ToEmail, // list of receivers
            subject: 'Activate Account', // Subject line
            text: 'Activate Account', // plain text body
            html: mailContent // HTML body
        });
        return 'Send Register Email Success'
    }
}