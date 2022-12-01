import { NextFunction, Request, Response } from 'express';
import StatusError from '../utils/StatusError';

export default class LoginFieldsMiddleware {
  static checkEmptyFields = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    if (!email || !password) next(new StatusError(400, 'All fields must be filled'));
    next();
  };
}
