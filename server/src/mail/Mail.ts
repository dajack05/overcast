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

export function SendEmail(from: string, to: string, body: string) {
  console.log("Sending...",from,to,body);
  mail.verify(function(error, _) {
    if (error) {
      console.log(error);
    } else {
        mail.sendMail({
            to,
            from,
            text:body,
        },(err,info)=>{
            console.log(err,info);
        })
    }
  });
}