import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static findTeams = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const teams = await TeamService.findTeams(+id);
    res.status(200).json(teams);
  };
}
