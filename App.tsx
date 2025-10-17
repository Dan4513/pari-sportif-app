import React, { useState, useMemo, useCallback } from 'react';
import { MatchData, Outcome, BetDetails } from './types';
import MatchDisplay from './components/MatchDisplay';
import BettingPanel from './components/BettingPanel';
import BetSlip from './components/BetSlip';

const initialMatchData: MatchData = {
  team1: 'PSG',
  team2: 'Marseille',
  odds: {
    team1: 2.30,
    draw: 3.10,
    team2: 1.90,
  }
};

const App: React.FC = () => {
  const [matchData] = useState<MatchData>(initialMatchData);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [stake, setStake] = useState<string>('');
  const [confirmedBet, setConfirmedBet] = useState<BetDetails | null>(null);

  const potentialWinnings = useMemo(() => {
    if (!selectedOutcome || !stake) {
        return 0;
    }
    const numericStake = parseFloat(stake);
    if (isNaN(numericStake) || numericStake <= 0) {
        return 0;
    }
    const oddsMap: Record<Outcome, number> = {
        team1: matchData.odds.team1,
        draw: matchData.odds.draw,
        team2: matchData.odds.team2,
    };
    const currentOdds = oddsMap[selectedOutcome];
    return numericStake * currentOdds;
  }, [selectedOutcome, stake, matchData.odds]);

  const handleSelectOutcome = useCallback((outcome: Outcome) => {
    setSelectedOutcome(prevOutcome => (prevOutcome === outcome ? null : outcome));
    setConfirmedBet(null);
  }, []);

  const handleStakeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
        setStake(value);
        setConfirmedBet(null);
    }
  }, []);

  const handleSubmitBet = useCallback(() => {
    const numericStake = parseFloat(stake);
    if (!selectedOutcome || isNaN(numericStake) || numericStake <= 0) {
        return;
    }
    const selectionMap: Record<Outcome, string> = {
        team1: matchData.team1,
        draw: 'Draw',
        team2: matchData.team2,
    };
    const oddsMap: Record<Outcome, number> = {
        team1: matchData.odds.team1,
        draw: matchData.odds.draw,
        team2: matchData.odds.team2,
    };

    setConfirmedBet({
        match: `${matchData.team1} vs ${matchData.team2}`,
        selection: selectionMap[selectedOutcome],
        odds: oddsMap[selectedOutcome],
        stake: numericStake,
        potentialWinnings: potentialWinnings,
    });
  }, [stake, selectedOutcome, matchData, potentialWinnings]);
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            Sports Bet Simulator
          </h1>
          <p className="text-slate-400 mt-2">Place your bet and see the potential winnings.</p>
        </header>

        <main className="bg-slate-800 p-6 rounded-xl shadow-2xl shadow-slate-950/50 space-y-6 border border-slate-700">
          <MatchDisplay 
            matchData={matchData} 
            selectedOutcome={selectedOutcome} 
            onSelectOutcome={handleSelectOutcome} 
          />
          <BettingPanel 
            stake={stake}
            onStakeChange={handleStakeChange}
            onSubmitBet={handleSubmitBet}
            potentialWinnings={potentialWinnings}
            isOutcomeSelected={!!selectedOutcome}
          />
        </main>
        
        {confirmedBet && <BetSlip betDetails={confirmedBet} />}
      </div>
    </div>
  );
};

export default App;
