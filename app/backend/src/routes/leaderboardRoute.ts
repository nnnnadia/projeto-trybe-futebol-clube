import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboard = Router();

leaderboard.get('/home', LeaderboardController.getLeaderboard);

export default leaderboard;
