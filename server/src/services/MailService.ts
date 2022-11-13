import { Users } from '.prisma/client';
import nodemailer from 'nodemailer'

const mail = nodemailer.createTransport({
    pool: true,
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT),
    secure: true,  // use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

export class MailService{
    static SendTemplatedEmail(template:string, to:string){
      mail.verify(err=>{
        if(err){
          console.error(err);
          return;
        }

        mail.sendMail({
          to,
          from:"admin@overcast.com",
          html:template,
        },
          (err,info)=>{
          console.error(err,info);
          return;
        });
      })
    }
}