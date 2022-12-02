import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const match = Router();

match.get('/', MatchController.findMatches);

export default match;
