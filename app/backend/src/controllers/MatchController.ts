import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static findMatches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await MatchService.findMatches();
      return res.status(200).json(matches);
    }
    next();
  };

  static findMatchesInProgress = async (
    req: Request,
    res: Response,
  ) => {
    const { inProgress } = req.query;
    const matches = inProgress === 'false'
      ? await MatchService.findMatchesInProgress(false)
      : await MatchService.findMatchesInProgress(true);
    return res.status(200).json(matches);
  };
}
