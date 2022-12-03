import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import StatusError from '../utils/StatusError';

export default class MatchFieldsMiddleware {
  static validateTeams = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      next(new StatusError(422, 'It is not possible to create a match with two equal teams'));
    }
    await TeamService.findTeams(homeTeam);
    await TeamService.findTeams(awayTeam);
    next();
  };
}
