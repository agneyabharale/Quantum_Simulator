import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';

const ProbabilityBars = () => {
  const simulation = useCircuitStore((state) => state.simulation);

  if (!simulation) return null;

  const { probabilities } = simulation;
  const p0 = (probabilities.p0 * 100).toFixed(1);
  const p1 = (probabilities.p1 * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-5">
      {/* Probability Bar for |0> */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PROBABILITY |0⟩</span>
          <span className="text-xs font-bold text-[#3f51b5]">{p0}%</span>
        </div>
        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#3f51b5] transition-all duration-500 ease-out"
            style={{ width: `${p0}%` }}
          />
        </div>
      </div>

      {/* Probability Bar for |1> */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PROBABILITY |1⟩</span>
          <span className="text-xs font-bold text-[#26a69a]">{p1}%</span>
        </div>
        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#26a69a] transition-all duration-500 ease-out"
            style={{ width: `${p1}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProbabilityBars;
