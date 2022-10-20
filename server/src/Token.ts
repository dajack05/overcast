import {UserPermission} from '@ovc/common';
import jwt from 'jsonwebtoken';

import {Users} from '.prisma/client';

export interface TokenData {
  email: string;
  permission_level: UserPermission;
}

export class TokenManager {
  static Generate(user: Users): string {
    return jwt.sign(
        {
          email: user.email,
          permission_level: user.permission_level,
        } as TokenData,
        process.env.JWT_SECRET);
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
