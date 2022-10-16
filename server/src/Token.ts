import jwt from 'jsonwebtoken'

export class TokenManager {
  
    static Generate(email: string): string {
    return jwt.sign(email, process.env.JWT_SECRET);
  }

  static Verify(token: string): boolean {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof result === 'string') {
        console.log(result);
      return false;
    }

    console.log(result);

    return true;
  }

}