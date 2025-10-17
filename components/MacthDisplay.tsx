import React from 'react';
import { MatchData, Outcome } from '../types';

interface MatchDisplayProps {
  matchData: MatchData;
  selectedOutcome: Outcome | null;
  onSelectOutcome: (outcome: Outcome) => void;
}

const OutcomeButton: React.FC<{
  label: string;
  odds: number;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, odds, isSelected, onClick }) => {
  const baseClasses = "w-full text-center px-4 py-3 rounded-lg transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800";
  const selectedClasses = "bg-emerald-500 text-white shadow-lg scale-105";
  const unselectedClasses = "bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      <span className="font-semibold">{label}</span>
      <span className="block text-lg font-bold">{odds.toFixed(2)}</span>
    </button>
  );
};


const MatchDisplay: React.FC<MatchDisplayProps> = ({ matchData, selectedOutcome, onSelectOutcome }) => {
  return (
    <div className="space-y-4">
      <div className="text-center py-2 px-4 bg-slate-900/50 rounded-lg">
        <h2 className="text-xl font-bold tracking-wide text-slate-100">{matchData.team1} vs {matchData.team2}</h2>
        <p className="text-sm text-slate-400">Ligue 1 - Sunday 20:45</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <OutcomeButton 
          label={matchData.team1}
          odds={matchData.odds.team1}
          isSelected={selectedOutcome === 'team1'}
          onClick={() => onSelectOutcome('team1')}
        />
        <OutcomeButton 
          label="Draw"
          odds={matchData.odds.draw}
          isSelected={selectedOutcome === 'draw'}
          onClick={() => onSelectOutcome('draw')}
        />
        <OutcomeButton 
          label={matchData.team2}
          odds={matchData.odds.team2}
          isSelected={selectedOutcome === 'team2'}
          onClick={() => onSelectOutcome('team2')}
        />
      </div>
    </div>
  );
};

export default MatchDisplay;
