import TeamLeaderboard from './TeamLeaderboard';
import MatchService from './MatchService';
import IMatch from '../types/interfaces/IMatch';

export default class LeaderboardService {
  private static getTeamsId = (
    matchesResults: IMatch[],
    whichTeam: 'awayTeam' | 'homeTeam',
  ): number[] => Array.from(new Set(matchesResults.map((result) => result[whichTeam])));

  private static getTeamsLeaderboard = async (
    getIt: boolean,
    whichTeam: 'awayTeam' | 'homeTeam',
  ) => {
    if (!getIt) return [];
    const matchesResults = await MatchService.findMatchesInProgress(false);
    const leaderboards = await Promise.all(
      LeaderboardService.getTeamsId(matchesResults, whichTeam)
        .map((id) => TeamLeaderboard.getParcialTeamLeaderboard(id, whichTeam)),
    );
    return leaderboards;
  };

  private static getTeamsFullLeaderboard = async () => {
    const matchesResults = await MatchService.findMatchesInProgress(false);
    const leaderboards = await Promise.all(
      LeaderboardService.getTeamsId(matchesResults, 'homeTeam')
        .map((id) => TeamLeaderboard.getFullTeamLeaderboard(id)),
    );
    return leaderboards;
  };

  private static getUpdatedLeaderboards = async (getHomeTeams: boolean, getAwayTeams: boolean) => {
    const updatedLeaderboard = getHomeTeams && getAwayTeams
      ? LeaderboardService.getTeamsFullLeaderboard()
      : [
        ...await LeaderboardService.getTeamsLeaderboard(getHomeTeams, 'homeTeam'),
        ...await LeaderboardService.getTeamsLeaderboard(getAwayTeams, 'awayTeam'),
      ];
    return updatedLeaderboard;
  };

  static getOrderedLeaderboards = async (getHomeTeams: boolean, getAwayTeams: boolean) => {
    const leaderboards = await LeaderboardService
      .getUpdatedLeaderboards(getHomeTeams, getAwayTeams);
    leaderboards.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return leaderboards;
  };
}
