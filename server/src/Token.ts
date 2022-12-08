import jwt from 'jsonwebtoken';

import {Users} from '.prisma/client';
import { UserType } from '@ovc/common';

export interface TokenData {
  id: number
  user_type:UserType
}

export class TokenManager {
  static Generate(user: Users): string {
    const token = jwt.sign(
      {
        id: user.id,
        user_type:user.permission_level,
      } as TokenData,
      process.env.JWT_SECRET);
      console.info(token);
    return token;
  }

  static Verify(token: string): TokenData|null {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      return result as TokenData;
    } catch (err) {
      console.error(err);
    }
    return null;
  }
}
