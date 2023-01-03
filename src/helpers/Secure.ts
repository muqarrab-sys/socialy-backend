import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '@/configs';

class Secure {
  static async hash(pass: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(pass, salt);
  }

  static async compare(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }

  static jwtToken(payload: { userId: string }): string {
    return jwt.sign(payload, config.tokens.jwt.secret, { expiresIn: config.tokens.jwt.expiresIn });
  }

  static jwtVerify(token: string): any {
    return jwt.verify(token, config.tokens.jwt.secret);
  }
}

export default Secure;
