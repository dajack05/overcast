import {urlencoded} from 'body-parser';
import nodemailer from 'nodemailer';
import { type } from 'os';

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

export function SendEmail(
    from: string, to: string, body: string, is_html = false) {
  mail.verify(function(error, _) {
    if (error) {
      console.log(error);
    } else {
      if (is_html) {
        mail.sendMail(
            {
              to,
              from,
              html: body,
            },
            (err, info) => {
              console.log(err, info);
            })
      } else {
        mail.sendMail(
            {
              to,
              from,
              text: body,
            },
            (err, info) => {
              console.log(err, info);
            })
      }
    }
  });
}