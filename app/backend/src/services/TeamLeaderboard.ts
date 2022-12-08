import MatchService from './MatchService';
import TeamService from './TeamService';
import ITeamLeaderboard from '../types/interfaces/ITeamLeaderboard';
import IResult from '../types/interfaces/IResult';

export default class TeamLeaderboard {
  readonly name: string;
  readonly totalPoints: number;
  readonly totalGames: number;
  readonly totalVictories: number;
  readonly totalDraws: number;
  readonly totalLosses: number;
  readonly goalsFavor: number;
  readonly goalsOwn: number;
  readonly goalsBalance: number;
  readonly efficiency: number;

  private constructor(points: ITeamLeaderboard) {
    this.name = points.name;
    this.totalPoints = points.totalPoints;
    this.totalGames = points.totalGames;
    this.totalVictories = points.totalVictories;
    this.totalDraws = points.totalDraws;
    this.totalLosses = points.totalLosses;
    this.goalsFavor = points.goalsFavor;
    this.goalsOwn = points.goalsOwn;
    this.goalsBalance = points.goalsBalance;
    this.efficiency = points.efficiency;
  }

  private static getBlankAccumulator = () => ({
    totalPoints: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    totalGames: 0,
    totalLosses: 0,
    totalDraws: 0,
    totalVictories: 0,
  });

  private static getTeamName = async (id: number) => {
    const team = await TeamService.findTeamById(id);
    return team.teamName;
  };

  private static getGamePoints = (teamGoals: number, rivalGoals: number) => {
    let teamScored = 1;
    if (teamGoals !== rivalGoals) {
      if (teamGoals > rivalGoals) {
        teamScored = 3;
      } else {
        teamScored = 0;
      }
    }
    return ({ teamGoals, rivalGoals, teamScored });
  };

  private static getHomeTeamMatchesResults = async (id: number) => {
    const matchesResults = await MatchService.findMatchesInProgress(false);
    return matchesResults
      .filter((match) => match.homeTeam === id)
      .map((match) => ({
        teamGoals: match.homeTeamGoals,
        rivalGoals: match.awayTeamGoals,
      }));
  };

  private static winLossOrDraw = (pointsMade: number, fieldPoints: number) => {
    if (pointsMade === fieldPoints) return 1;
    return 0;
  };

  private static countHomeTeamPoints = async (id: number, accumulator: IResult) => {
    const matches = await TeamLeaderboard.getHomeTeamMatchesResults(id);
    const matchesResume = matches
      .map(({ teamGoals, rivalGoals }) => TeamLeaderboard.getGamePoints(teamGoals, rivalGoals));
    matchesResume.forEach((resume) => {
      accumulator.totalPoints += resume.teamScored;
      accumulator.goalsFavor += resume.teamGoals;
      accumulator.goalsOwn += resume.rivalGoals;
      accumulator.totalGames += 1;
      accumulator.totalLosses += TeamLeaderboard
        .winLossOrDraw(resume.teamScored, 0);
      accumulator.totalDraws += TeamLeaderboard
        .winLossOrDraw(resume.teamScored, 1);
      accumulator.totalVictories += TeamLeaderboard
        .winLossOrDraw(resume.teamScored, 3);
    });
    return accumulator;
  };

  private static getEfficiency = (
    totalPoints: number,
    totalGames: number,
  ) => +((totalPoints / (totalGames * 3)) * 100).toFixed(2);

  public static getTeamLeaderboard = async (id: number) => {
    const accumulator = await TeamLeaderboard
      .countHomeTeamPoints(id, TeamLeaderboard.getBlankAccumulator());
    const efficiency = TeamLeaderboard
      .getEfficiency(accumulator.totalPoints, accumulator.totalGames);
    const updatedLeaderboard = {
      name: await TeamLeaderboard.getTeamName(id),
      ...accumulator,
      efficiency,
      goalsBalance: accumulator.goalsFavor - accumulator.goalsOwn,
    };
    return new TeamLeaderboard(updatedLeaderboard);
  };
}
