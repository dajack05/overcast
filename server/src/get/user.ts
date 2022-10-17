import { Request, Response } from "express";
import { TokenManager } from "../Token";
import { wait_ms } from "../utils";
import { ERR, Message, OK, User as _User } from "@ovc/common";
import { PrismaClient } from ".prisma/client";

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
  const prisma = new PrismaClient();
  const user = await prisma.users.findFirst({
    where: { email: req.query.email as string },
  });
  prisma.$disconnect();

  return OK({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    dob: user.dob,
  } as _User);
}
