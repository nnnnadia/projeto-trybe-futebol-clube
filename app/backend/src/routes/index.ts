import { Router } from 'express';
import loginRoute from './loginRoute';
import teamRoute from './teamRoute';
import matchRoute from './matchRoute';
import leaderboardRoute from './leaderboardRoute';
import ErrorController from '../controllers/ErrorController';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamRoute);
router.use('/matches', matchRoute);
router.use('/leaderboard', leaderboardRoute);

router.use(ErrorController.handler);

export default router;
