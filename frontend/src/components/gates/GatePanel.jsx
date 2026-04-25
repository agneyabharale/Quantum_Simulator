import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';

const GatePanel = () => {
  const addGate = useCircuitStore((state) => state.addGate);
  const isLoading = useCircuitStore((state) => state.isLoading);

  const gates = [
    { name: 'X', color: '#ff5252', desc: 'NOT' },
    { name: 'Y', color: '#4caf50', desc: 'Phase + Bit flip' },
    { name: 'Z', color: '#2196f3', desc: 'Phase flip' },
    { name: 'H', color: '#ffc107', desc: 'Superposition' },
    { name: 'S', color: '#9c27b0', desc: '90° Z-rot' },
    { name: 'T', color: '#e91e63', desc: '45° Z-rot' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {gates.map((gate) => (
        <button
          key={gate.name}
          onClick={() => addGate(gate.name)}
          disabled={isLoading}
          className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group active:scale-95 disabled:opacity-50"
        >
          <div 
            className="w-10 h-10 flex items-center justify-center rounded-md text-white font-bold text-lg mb-1 shadow-sm transition-transform group-hover:scale-110"
            style={{ backgroundColor: gate.color }}
          >
            {gate.name}
          </div>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{gate.desc}</span>
        </button>
      ))}
    </div>
  );
};

export default GatePanel;
