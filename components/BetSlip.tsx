import React from 'react';
import { BetDetails } from '../types';
import { TicketIcon } from './icons/TicketIcon';

interface BetSlipProps {
  betDetails: BetDetails;
}

const BetSlip: React.FC<BetSlipProps> = ({ betDetails }) => {
  return (
    <div className="bg-slate-800 border-2 border-dashed border-slate-600 p-6 rounded-xl shadow-2xl shadow-slate-950/50 animate-fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-600">
        <h3 className="text-2xl font-bold text-slate-100">Bet Slip</h3>
        <TicketIcon className="w-8 h-8 text-emerald-400" />
      </div>
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-baseline">
          <span className="text-slate-400">Match:</span>
          <span className="font-semibold text-right">{betDetails.match}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-slate-400">Your Pick:</span>
          <span className="font-semibold text-right">{betDetails.selection}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-slate-400">Odds:</span>
          <span className="font-semibold text-right">{betDetails.odds.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-slate-400">Stake:</span>
          <span className="font-semibold text-right">€{betDetails.stake.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-dashed border-slate-600 flex justify-between items-center bg-slate-900/50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
        <span className="text-lg font-bold text-slate-200">Potential Winnings</span>
        <span className="text-2xl font-bold text-emerald-400">€{betDetails.potentialWinnings.toFixed(2)}</span>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BetSlip;
