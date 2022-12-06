import ITeam from '../types/interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';
import StatusError from '../utils/StatusError';

export default class TeamService {
  static findEveryTeam = async (): Promise<ITeam[]> => {
    try {
      const teams = await TeamModel.findAll();
      if (teams) return teams;
      throw new StatusError(404, 'There is no team registered');
    } catch (error) {
      if (error instanceof StatusError) throw error;
      throw new StatusError(500);
    }
  };

  static findTeamById = async (id: number): Promise<ITeam> => {
    try {
      const team = await TeamModel.findOne({ where: { id } });
      if (team) return team;
      throw new StatusError(404, 'There is no team with such id!');
    } catch (error) {
      if (error instanceof StatusError) throw error;
      throw new StatusError(500);
    }
  };
}
