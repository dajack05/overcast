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

interface Email {
  from: string;
  to: string;
  subject: string;
  body: string;
}

let isRunning = false;
const emailQueue: Email[] = [];

export class MailService {
  static async Send(
    html: string,
    subject: string,
    to: string
  ): Promise<Message<string>> {
    let email = to;

    if (IsDev()) {
      // Don't send to real people!
      email = `dajack05@gmail.com`;
      subject = `<${to}>${subject}`;
    }

    emailQueue.push({
      to: email,
      from: "admin@overcast.com",
      subject: subject,
      body: html,
    });

    SendQueue();

    return OK();
  }
}

async function SendQueue() {
  if (isRunning) {
    console.log("Already running!");
    return;
  }

  isRunning = true;
  let nextEmail: Email | undefined;
  while ((nextEmail = emailQueue.shift()) !== undefined) {
    try {
      await mail.sendMail({
        to: nextEmail.to,
        subject: nextEmail.subject,
        from: nextEmail.from,
        html: nextEmail.body,
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`${emailQueue.length} emails remaining`);
  }
  isRunning = false;
}
