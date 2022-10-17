import { Request } from "express";
import { TokenManager } from "../Token";
import { ERR, Message, OK, User as _User } from "@ovc/common";
import { prisma } from "../Global";

export async function PutUser(req: Request): Promise<Message> {
  const { token, email, password, dob, first_name, last_name } = req.body;

  if (!token) {
    return ERR("Missing token");
  }

  if (!email) {
    return ERR("Missing email");
  }

  if (!password) {
    return ERR("Missing password");
  }

  if (!dob) {
    return ERR("Missing dob");
  }

  if (!first_name) {
    return ERR("Missing first name");
  }

  if (!last_name) {
    return ERR("Missing last name");
  }

  if (!TokenManager.Verify(token as string)) {
    return ERR("Invalid Token");
  }

  try {
    await prisma.users.create({
      data: {
        email,
        dob,
        password,
        first_name,
        last_name,
      },
    });
  } catch (err) {
    console.log(err);
    return ERR(err);
  }

  return OK("OK");
}

export async function GetUser(req: Request): Promise<Message> {
  if (!req.query.token) {
    return ERR("Missing token");
  }

  if (!req.query.email) {
    return ERR("Missing email");
  }

  const token = req.query.token as string;
  // Verify token
  const is_token_valid = TokenManager.Verify(token);

  if (!is_token_valid) {
    return ERR("Invalid Token");
  }

  // Go get the user!
  try {
    const user = await prisma.users.findFirst({
      where: { email: req.query.email as string },
    });

    if (!user) {
      return ERR(`Failed to find user with email "${req.query.email}"`);
    }

    return OK({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      dob: user.dob,
    } as _User);
  } catch (err) {
    console.error(err);
    return ERR(err);
  }
}
