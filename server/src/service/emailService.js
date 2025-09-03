import nodemailer from 'nodemailer';
import config from '../config/config';

const transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
    },
});

module.exports = {
    sendEmail: async (to, subject, text, html) => {
        try {
            await transporter.sendMail({
                from: `Nessa <${config.EMAIL_USER}>`,
                to,
                subject,
                text,
                ...(html && { html })
            });
        } catch (err) {
            throw err;
        }
    }
};