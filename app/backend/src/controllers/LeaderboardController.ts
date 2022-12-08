import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static getLeaderboard = async (
    _req: Request,
    res: Response,
  ) => {
    const leaderboards = await LeaderboardService.getOrderedLeaderboards();
    res.status(200).json(leaderboards);
  };
}
