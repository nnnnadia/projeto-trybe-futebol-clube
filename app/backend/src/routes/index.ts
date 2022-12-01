import { Router } from 'express';
import loginRoute from './loginRoute';
import ErrorController from '../controllers/ErrorController';

const router = Router();

router.use('/login', loginRoute);

router.use(ErrorController.handler);

export default router;
