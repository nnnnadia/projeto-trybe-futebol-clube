import { Router } from 'express';
import AuthLoginMiddleware from '../middlewares/AuthLoginMiddleware';
import UserController from '../controllers/UserController';

const login = Router();

login.post('/', AuthLoginMiddleware.checkPassword, UserController.login);

export default login;
