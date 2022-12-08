import MatchModel from '../database/models/MatchModel';
import IMatch from '../types/interfaces/IMatch';
import StatusError from '../utils/StatusError';

export default class MatchService {
  static findMatches = async (): Promise<IMatch[]> => {
    try {
      const matches = await MatchModel.findAll({
        include: [{
          all: true,
          attributes: { exclude: ['id'] },
        }],
      });
      return matches;
    } catch (error) {
      throw new StatusError(500);
    }
  };

  static findMatchesInProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    try {
      const matches = await MatchModel.findAll({
        where: { inProgress },
        include: [{
          all: true,
          attributes: { exclude: ['id'] },
        }],
      });
      return matches;
    } catch (error) {
      throw new StatusError(500);
    }
  };

  static createMatch = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> => {
    try {
      const inProgress = true;
      const matchCreated = await MatchModel.create({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
      });
      return matchCreated;
    } catch (error) {
      throw new StatusError(500);
    }
  };

  static finishMatch = async (id: number): Promise<void> => {
    try {
      await MatchModel.update({ inProgress: false }, { where: { id } });
    } catch (error) {
      throw new StatusError(500);
    }
  };

  static changeScore = async (
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> => {
    try {
      await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    } catch (error) {
      if (error instanceof Error) throw new StatusError(500, error.message);
    }
  };
}
