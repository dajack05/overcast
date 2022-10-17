import jwt from "jsonwebtoken";

export class TokenManager {
  static Generate(email: string): string {
    return jwt.sign(email, process.env.JWT_SECRET);
  }

  static Verify(token: string): boolean {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
