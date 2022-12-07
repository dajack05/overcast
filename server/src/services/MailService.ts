import { ERR, Message, OK } from "@ovc/common";
import { config } from "dotenv";
import nodemailer from "nodemailer";
import { IsDev } from "../Global";

config();
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
  static async Send(
    html: string,
    subject: string,
    to: string | string[]
  ): Promise<Message<string>> {
    let email = to;

    if (IsDev()) {
      // Don't send to real people!
      email = `dajack05@gmail.com`;
      subject = `<${to}>${subject}`;
    }

    try {
      await mail.sendMail({
        to: email,
        subject: subject,
        from: "admin@overcast.com",
        html: html,
      });
    } catch (error) {
      console.error(error);
      return ERR(error);
    }

    return OK();
  }
}
