import { NextFunction, Request, Response } from 'express';

export default class ErrorController {
  static handler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    res.status(500).json(err.message);
  };
}
