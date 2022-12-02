import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const match = Router();

match.get(
  '/',
  MatchController.findMatches,
  MatchController.findMatchesInProgress,
);

export default match;
