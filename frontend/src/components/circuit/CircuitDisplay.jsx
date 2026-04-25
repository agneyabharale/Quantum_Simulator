import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';

const CircuitDisplay = () => {
  const gates = useCircuitStore((state) => state.gates);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quantum Circuit Timeline</h3>
      
      <div className="relative flex items-center min-h-[60px] bg-gray-50/50 p-6 rounded-lg border border-dashed border-gray-200 overflow-x-auto">
        {/* The Circuit Wire */}
        <div className="absolute left-0 w-full h-[1px] bg-gray-300" />
        
        {/* The |0> Label */}
        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded bg-indigo-600 shadow-md mr-6">
          <span className="text-white font-mono text-sm">|0⟩</span>
        </div>

        {/* The Gates */}
        <div className="flex gap-4 items-center relative z-10">
          {gates.map((gate, index) => (
            <div key={index} className="flex flex-col items-center animate-fade-in">
              <div className={`w-9 h-9 rounded flex items-center justify-center font-bold text-white text-xs shadow-sm
                              ${getGateColor(gate)}`}>
                {gate.includes('Rx') ? 'Rx' : gate.includes('Ry') ? 'Ry' : gate.includes('Rz') ? 'Rz' : gate}
              </div>
              <span className="text-[8px] text-gray-400 mt-1 font-bold">{index + 1}</span>
            </div>
          ))}
          
          {gates.length === 0 && (
            <span className="text-gray-300 italic text-xs ml-2 uppercase tracking-tight">Qubit is in ground state</span>
          )}
        </div>
      </div>
    </div>
  );
};

const getGateColor = (gate) => {
  if (gate.includes('Rx')) return 'bg-[#ff5252]';
  if (gate.includes('Ry')) return 'bg-[#4caf50]';
  if (gate.includes('Rz')) return 'bg-[#2196f3]';
  switch (gate) {
    case 'X': return 'bg-[#ff5252]';
    case 'Y': return 'bg-[#4caf50]';
    case 'Z': return 'bg-[#2196f3]';
    case 'H': return 'bg-[#ffc107]';
    case 'S': return 'bg-[#9c27b0]';
    case 'T': return 'bg-[#e91e63]';
    default: return 'bg-gray-400';
  }
};

export default CircuitDisplay;
