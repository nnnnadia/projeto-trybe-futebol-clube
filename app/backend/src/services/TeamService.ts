import ITeam from '../types/interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';
import StatusError from '../utils/StatusError';

export default class TeamService {
  static findTeams = async (id?: number): Promise<ITeam[] | ITeam> => {
    try {
      const teams = id
        ? await TeamModel.findOne({ where: { id } })
        : await TeamModel.findAll();
      if (teams) return teams;
      throw new StatusError(404, 'Team not found');
    } catch (error) {
      if (error instanceof StatusError) throw error;
      throw new StatusError(500, 'Internal error');
    }
  };
}
