import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static findMatches = async (
    _req: Request,
    res: Response,
  ) => {
    const matches = await MatchService.findMatches();
    res.status(200).json(matches);
  };
}
