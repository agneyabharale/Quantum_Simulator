import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';

const RotationPanel = () => {
  const addGate = useCircuitStore((state) => state.addGate);
  const isLoading = useCircuitStore((state) => state.isLoading);

  const rotations = [
    { name: 'Rx(π/2)', label: 'X +90°', color: '#ff5252' },
    { name: 'Rx(-π/2)', label: 'X -90°', color: '#ff5252' },
    { name: 'Ry(π/2)', label: 'Y +90°', color: '#4caf50' },
    { name: 'Ry(-π/2)', label: 'Y -90°', color: '#4caf50' },
    { name: 'Rz(π/2)', label: 'Z +90°', color: '#2196f3' },
    { name: 'Rz(-π/2)', label: 'Z -90°', color: '#2196f3' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {rotations.map((rot) => (
        <button
          key={rot.name}
          onClick={() => addGate(rot.name)}
          disabled={isLoading}
          className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all shadow-xl active:scale-95 disabled:opacity-50 group"
        >
          <div 
            className="px-3 py-1 rounded-md text-white text-[10px] font-black mb-2 shadow-lg group-hover:scale-105 transition-transform"
            style={{ backgroundColor: rot.color }}
          >
            {rot.label}
          </div>
          <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{rot.name}</span>
        </button>
      ))}
    </div>
  );
};

export default RotationPanel;
