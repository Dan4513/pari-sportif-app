export interface MatchData {
  team1: string;
  team2: string;
  odds: {
    team1: number;
    draw: number;
    team2: number;
  };
}

export type Outcome = 'team1' | 'draw' | 'team2';

export interface BetDetails {
  match: string;
  selection: string;
  odds: number;
  stake: number;
  potentialWinnings: number;
}
