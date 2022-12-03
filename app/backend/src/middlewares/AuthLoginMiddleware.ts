import { compareSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import StatusError from '../utils/StatusError';
import UserService from '../services/UserService';
import AuthJWTService from '../services/AuthJWTService';

export default class AuthLoginMiddleware {
  static checkPassword = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    const { password: hash } = await UserService.findUserByEmail(email);
    const isUnlocked = compareSync(password, hash);
    if (!isUnlocked) next(new StatusError(401, 'Incorrect email or password'));
    next();
  };

  static validateJWT = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { authorization } = req.headers;
    AuthJWTService.validateToken(authorization as string);
    next();
  };
}
