import nodemailer from "nodemailer";
import { IsDev } from "../Global";

const mail = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT),
  secure: true, // use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export class MailService {
  static Send(html: string, subject: string, to: string) {
    let email = to;

    if (IsDev()) {
      // Don't send to real people!
      email = `dajack05@gmail.com`;
      subject = `<${to}>${subject}`;
    }

    mail.verify((err) => {
      if (err) {
        console.error(err);
        return;
      }

      mail.sendMail(
        {
          to: email,
          subject: subject,
          from: "admin@overcast.com",
          html: html,
        },
        (err, info) => {
          console.error(err, info);
          return;
        }
      );
    });
  }
}
