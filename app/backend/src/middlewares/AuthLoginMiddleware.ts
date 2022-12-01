import { compareSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

export default class AuthLoginMiddleware {
  static checkPassword = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    const { password: hash } = await UserService.findUserByEmail(email);
    const isUnlocked = compareSync(password, hash);
    if (!isUnlocked) next(new Error('WRONG_PASSWORD'));
    next();
  };
}
