import TeamLeaderboard from './TeamLeaderboard';
import MatchService from './MatchService';

export default class LeaderboardService {
  private static getHomeTeamsLeaderboard = async () => {
    const matchesResults = await MatchService.findMatchesInProgress(false);
    const leaderboards = await Promise.all(Array.from(new Set(matchesResults
      .map((result) => result.homeTeam)))
      .map((id) => TeamLeaderboard.getTeamLeaderboard(id)));
    return leaderboards;
  };

  static getOrderedLeaderboards = async () => {
    const updatedLeaderboard = await LeaderboardService.getHomeTeamsLeaderboard();
    updatedLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return updatedLeaderboard;
  };
}
