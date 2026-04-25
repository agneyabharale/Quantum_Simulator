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
          className="flex flex-col items-center justify-center p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <div 
            className="px-2 py-1 rounded text-white text-xs font-bold mb-1"
            style={{ backgroundColor: rot.color }}
          >
            {rot.label}
          </div>
          <span className="text-[10px] text-gray-400 font-mono italic">{rot.name}</span>
        </button>
      ))}
    </div>
  );
};

export default RotationPanel;
