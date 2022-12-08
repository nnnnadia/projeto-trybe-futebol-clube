import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboard = Router();

leaderboard.get('/home', LeaderboardController.getHomeTeamsLeaderboard);
leaderboard.get('/away', LeaderboardController.getAwayTeamsLeaderboard);

export default leaderboard;
