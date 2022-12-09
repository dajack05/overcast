import { ERR, Message, OK, UserType } from "@ovc/common";
import { Request } from "express";
import { MailService } from "../services/MailService";
import { TokenManager } from "../Token";
import { WelcomeEmailTemplate } from "../../email_templates/welcome.html";
import { UserService } from "../services/UserService";
import { GroupService } from "../services/GroupService";

export async function SendWelcomeEmail(
  req: Request
): Promise<Message<boolean>> {
  const token = req.body.token as string;
  const email_address = req.body.email as string;

  if (!token || !email_address) {
    return ERR("Missing Prarms");
  }

  const result = TokenManager.Verify(token);
  if (!result) {
    return ERR("Bad Token");
  }

  if (result.user_type !== UserType.ADMIN) {
    return ERR("Insufficent Permission");
  }

  const user = await UserService.FindByEmail(email_address);
  if (user.error) {
    return ERR(user.error);
  }

  if (!user.payload) {
    return ERR("Failed to find user");
  }

  // TODO: Figure out which group they belog to (if multiple)
  const group = await GroupService.FindByUserEmail(email_address);
  if (group.error) {
    return ERR(group.error);
  }

  if (!group.payload) {
    return ERR("Failed to find group");
  }

  MailService.Send(WelcomeEmailTemplate(user.payload, group.payload[0]), "Welcome!", email_address);

  return OK(true);
}

export async function SendRawEmail(req: Request): Promise<Message<string>> {
  const token = req.body.token as string;
  const email_address = req.body.email as string;
  const subject = req.body.subject as string;
  const html = req.body.html as string;
  const text = req.body.text as string;

  if (!token || !email_address || !subject) {
    return ERR("Missing Prarms");
  }

  const user = await UserService.FindByEmail(email_address);
  if (user.error) {
    return ERR(user.error);
  }

  if (!user.payload) {
    return ERR("Failed to find user");
  }

  let message:Message<string>;

  if (html != undefined && html.length > 0) {
    // Send raw HTML
    message = await MailService.Send(html, subject, user.payload.email);
  } else {
    if (text == undefined || text.length <= 0) {
      return ERR("No html or text provided.");
    }

    // Split text into paragraphs
    let paragraphs = text.split("\n");

    // Wrap in rough HTML
    paragraphs = paragraphs.map((p) => `<p>${p}</p>`);
    const html_text = paragraphs.join("");



    // Send text
    message = await MailService.Send(html_text, subject,  user.payload.email);
  }

  return message;
}
