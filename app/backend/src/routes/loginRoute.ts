import { Router } from 'express';
import LoginFieldsMiddleware from '../middlewares/LoginFieldsMiddleware';
import AuthLoginMiddleware from '../middlewares/AuthLoginMiddleware';
import UserController from '../controllers/UserController';

const login = Router();

login.post(
  '/',
  LoginFieldsMiddleware.checkEmptyFields,
  AuthLoginMiddleware.checkPassword,
  UserController.login,
);

login.get(
  '/validate',
  UserController.getLoginValidation,
);

export default login;
