import { Request, Response } from 'express';
import AuthJWTService from '../services/AuthJWTService';
import UserService from '../services/UserService';

export default class UserController {
  static login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const token = await UserService.login(email);
    res.status(200).json({ token });
  };

  static getLoginValidation = (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const role = AuthJWTService.getTokenRole(authorization as string);
    res.status(200).json({ role });
  };
}
