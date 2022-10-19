import { Request, Response } from "express";
import { TokenManager } from "../Token";
import { ERR, Message, OK } from "@ovc/common";
import { wait_ms } from "../Global";
import { User } from "../User";

export async function LoginHandler(req: Request): Promise<Message> {
  const email = req.body.email;
  const password = req.body.password;

  if (email && typeof email === "string") {
    if (password && typeof password === "string") {
      // Find user
      const user = await User.GetByEmail(email);
      if (user && user.password === password) {
        // Update last login
        await User.Update({ ...user, last_logon: new Date() });
        return OK(
          TokenManager.Generate({
            email: user.email,
            permission_level: user.permission_level,
          })
        );
      }
    }
  }

  // If we failed... Take a break
  await wait_ms(100);
  return ERR("Invalid Email/Password");
}
