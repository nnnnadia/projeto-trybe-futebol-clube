import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  static login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const token = await UserService.login(email);
    res.status(200).json({ token });
  };
}
