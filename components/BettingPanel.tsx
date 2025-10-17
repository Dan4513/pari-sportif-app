import React from 'react';

interface BettingPanelProps {
  stake: string;
  onStakeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitBet: () => void;
  potentialWinnings: number;
  isOutcomeSelected: boolean;
}

const BettingPanel: React.FC<BettingPanelProps> = ({ 
  stake, 
  onStakeChange, 
  onSubmitBet, 
  potentialWinnings, 
  isOutcomeSelected 
}) => {
  const isButtonDisabled = !isOutcomeSelected || !stake || parseFloat(stake) <= 0;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="stake" className="block text-sm font-medium text-slate-400 mb-1">
          Your Stake (€)
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">€</span>
          <input
            type="text"
            id="stake"
            name="stake"
            value={stake}
            onChange={onStakeChange}
            placeholder="0.00"
            className="w-full pl-7 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          />
        </div>
      </div>
      
      <div className="h-14 flex items-center justify-center bg-slate-900/50 rounded-lg p-2">
        {potentialWinnings > 0 ? (
            <p className="text-slate-300">
                Potential Winnings: <span className="font-bold text-xl text-emerald-400">€{potentialWinnings.toFixed(2)}</span>
            </p>
        ) : (
            <p className="text-slate-500">Select an outcome and enter a stake</p>
        )}
      </div>

      <button
        onClick={onSubmitBet}
        disabled={isButtonDisabled}
        className="w-full py-3 px-4 bg-sky-600 text-white font-bold rounded-lg transition-all duration-200 ease-in-out disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-sky-500 hover:enabled:shadow-lg hover:enabled:shadow-sky-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500"
      >
        Place Bet
      </button>
    </div>
  );
};

export default BettingPanel;
