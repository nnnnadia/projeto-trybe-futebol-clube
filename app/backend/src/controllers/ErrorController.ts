import { NextFunction, Request, Response } from 'express';
import StatusError from '../utils/StatusError';

export default class ErrorController {
  static handler = (
    err: StatusError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    res.status(err.status).json({ message: err.message });
  };
}
