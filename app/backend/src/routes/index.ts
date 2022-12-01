import { Router } from 'express';
import loginRoute from './loginRoute';
import 'express-async-errors';
import ErrorController from '../controllers/ErrorController';

const router = Router();

router.use('/login', loginRoute);

router.use(ErrorController.handler);

export default router;
