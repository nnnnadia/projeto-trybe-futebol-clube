import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import AuthLoginMiddleware from '../middlewares/AuthLoginMiddleware';
import MatchFieldsMiddleware from '../middlewares/MatchFieldsMiddleware';

const match = Router();

match.get(
  '/',
  MatchController.findMatches,
  MatchController.findMatchesInProgress,
);

match.post(
  '/',
  AuthLoginMiddleware.validateJWT,
  MatchFieldsMiddleware.validateTeams,
  MatchController.createMatch,
);

match.patch('/:id/finish', MatchController.finishMatch);

export default match;
