import nodemailer from 'nodemailer'
import 'dotenv/config'

const {MAIL_FROM, MAIL_HOST, MAIL_USER, MAIL_PASSWORD, MAIL_PORT} = process.env

export class Mail {
    constructor(to, subject, body, from = null) {
        this.from = from || MAIL_FROM
        this.to = to
        this.subject = subject
        this.body = body

        this.transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            auth: {
              user: MAIL_USER,
              pass: MAIL_PASSWORD
            }
        });
    }

    sendMail = async () => {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject: this.subject,
                text: this.body,
                html: this.body
            }
            this.transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    reject(err) 
                } else {
                    resolve(info.response)
                }
            })
        })
    }
}