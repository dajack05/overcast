import { UserPermission } from "@ovc/common";
import jwt from "jsonwebtoken";

export interface TokenData {
  email: string;
  permission_level: UserPermission;
}

export class TokenManager {
  static Generate(data: TokenData): string {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  static Verify(token: string): TokenData | null {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      return result as TokenData;
    } catch (err) {
      console.error(err);
    }
    return null;
  }
}
