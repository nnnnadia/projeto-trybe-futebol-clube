import MatchModel from '../database/models/MatchModel';
import StatusError from '../utils/StatusError';

export default class MatchService {
  static findMatches = async () => {
    try {
      const matches = await MatchModel.findAll({
        include: [{
          all: true,
          attributes: { exclude: ['id'] },
        }],
      });
      return matches;
    } catch (error) {
      console.log(error);
      throw new StatusError(500, 'Internal error');
    }
  };
}
