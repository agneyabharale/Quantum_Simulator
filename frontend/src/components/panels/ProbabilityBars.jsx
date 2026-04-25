import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import PhaseDisk from './PhaseDisk';

const ProbabilityBars = () => {
  const simulation = useCircuitStore((state) => state.simulation);

  if (!simulation) return null;

  const { probabilities, phases } = simulation;
  const p0 = (probabilities.p0 * 100).toFixed(1);
  const p1 = (probabilities.p1 * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      {/* State |0> */}
      <div className="flex items-center gap-4">
        <PhaseDisk phase={phases.phase0} color="#3f51b5" />
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">STATE |0⟩</span>
            <span className="text-xs font-bold text-[#3f51b5]">{p0}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#3f51b5] transition-all duration-500 ease-out"
              style={{ width: `${p0}%` }}
            />
          </div>
          <div className="flex justify-between text-[8px] text-gray-400 font-bold">
             <span>prob: {probabilities.p0.toFixed(3)}</span>
             <span>phase: {(phases.phase0 * 180 / Math.PI).toFixed(0)}°</span>
          </div>
        </div>
      </div>

      {/* State |1> */}
      <div className="flex items-center gap-4">
        <PhaseDisk phase={phases.phase1} color="#26a69a" />
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">STATE |1⟩</span>
            <span className="text-xs font-bold text-[#26a69a]">{p1}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#26a69a] transition-all duration-500 ease-out"
              style={{ width: `${p1}%` }}
            />
          </div>
          <div className="flex justify-between text-[8px] text-gray-400 font-bold">
             <span>prob: {probabilities.p1.toFixed(3)}</span>
             <span>phase: {(phases.phase1 * 180 / Math.PI).toFixed(0)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityBars;
