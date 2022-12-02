import { Router } from 'express';
import loginRoute from './loginRoute';
import teamRoute from './teamRoute';
import ErrorController from '../controllers/ErrorController';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamRoute);

router.use(ErrorController.handler);

export default router;
