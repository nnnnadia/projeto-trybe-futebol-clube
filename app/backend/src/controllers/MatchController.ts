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

  static createMatch = async (
    req: Request,
    res: Response,
  ) => {
    const {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
    } = req.body;
    const match = await MatchService.createMatch(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(match);
  };

  static finishMatch = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    MatchService.finishMatch(+id);
    res.status(200).json({ message: 'Finished' });
  };
}
