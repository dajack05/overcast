import {ERR, Message, OK} from '@ovc/common';
import * as bcrypt from 'bcrypt';
import {Request} from 'express';

import {wait_ms} from '../Global';
import {UserService} from '../services/UserService';
import {TokenManager} from '../Token';

export async function LoginHandler(req: Request): Promise<Message<string>> {
  const email = req.body.email;
  const password = req.body.password;

  if (email && typeof email === 'string') {
    if (password && typeof password === 'string') {
      // Find user
      const message = await UserService.FindByEmail(email);
      if (message.error) {
        return ERR(message.error);
      }

      let user = message.payload;

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      console.log(isPasswordValid);

      if (isPasswordValid) {
        // Update last login
        const update_message =
            await UserService.UpdateTimestamp(user);
        if (update_message.error) {
          return ERR(update_message.error);
        }

        user = update_message.payload;

        return OK(TokenManager.Generate(user));
      }
    }
  }

  // If we failed... Take a break
  await wait_ms(100);
  return ERR('Invalid Email/Password');
}
