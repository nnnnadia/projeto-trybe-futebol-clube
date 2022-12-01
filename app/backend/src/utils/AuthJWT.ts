import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export default class AuthJWT {
  static readonly secretKey: string = process.env.JWT_SECRET as string;
  static readonly jwtConfig: object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  static createToken = (id: number, role: string): string => {
    const iat = new Date().getTime();
    return jwt.sign(
      { id, role, iat },
      AuthJWT.secretKey,
      AuthJWT.jwtConfig,
    );
  };
}
