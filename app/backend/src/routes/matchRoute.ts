import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import AuthLoginMiddleware from '../middlewares/AuthLoginMiddleware';

const match = Router();

match.get(
  '/',
  MatchController.findMatches,
  MatchController.findMatchesInProgress,
);

match.post(
  '/',
  AuthLoginMiddleware.validateJWT,
  MatchController.createMatch,
);

match.patch('/:id/finish', MatchController.finishMatch);

export default match;
