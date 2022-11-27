import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

TeamModel.belongsTo(MatchModel, { foreignKey: 'id', as: 'homeTeam' });
TeamModel.belongsTo(MatchModel, { foreignKey: 'id', as: 'awayTeam' });
MatchModel.hasOne(TeamModel, { foreignKey: 'homeTeam', as: 'id' });
MatchModel.hasOne(TeamModel, { foreignKey: 'awayTeam', as: 'id' });

export default MatchModel;
