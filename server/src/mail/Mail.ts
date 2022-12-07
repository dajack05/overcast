import { urlencoded } from "body-parser";
import nodemailer from "nodemailer";
import { ERR, Message, OK } from "@ovc/common";
import { type } from "os";

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

export function SendEmail(
  from: string,
  to: string,
  body: string,
  is_html = false
): Message<string> {
  mail.verify(function (error, _) {
    if (error) {
      console.log(error);
      return ERR(`${error.name}:${error.message}`);
    } else {
      if (is_html) {
        mail.sendMail(
          {
            to,
            from,
            html: body,
          },
          (err, info) => {
            console.error(info);
            return ERR(`${err.name}:${err.message}`);
          }
        );
      } else {
        mail.sendMail(
          {
            to,
            from,
            text: body,
          },
          (err, info) => {
            console.log(err, info);
            return ERR(`${error.name}:${error.message}`);
          }
        );
      }
    }
  });
  return OK();
}
