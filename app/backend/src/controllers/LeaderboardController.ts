import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static getHomeTeamsLeaderboard = async (
    _req: Request,
    res: Response,
  ) => {
    const leaderboards = await LeaderboardService.getOrderedLeaderboards(true, false);
    res.status(200).json(leaderboards);
  };

  static getAwayTeamsLeaderboard = async (
    _req: Request,
    res: Response,
  ) => {
    const leaderboards = await LeaderboardService.getOrderedLeaderboards(false, true);
    res.status(200).json(leaderboards);
  };
}
