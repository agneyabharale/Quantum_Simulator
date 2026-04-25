import React from 'react';

const GatePanel = ({ onAdd, onPreview }) => {
  const gates = [
    { id: 'X', name: 'X', color: 'bg-[#ff5252]', desc: 'Bit Flip' },
    { id: 'Y', name: 'Y', color: 'bg-[#4caf50]', desc: 'Bit+Phase' },
    { id: 'Z', name: 'Z', color: 'bg-[#2196f3]', desc: 'Phase Flip' },
    { id: 'H', name: 'H', color: 'bg-[#ffc107]', desc: 'Hadamard' },
    { id: 'S', name: 'S', color: 'bg-[#9c27b0]', desc: 'Phase S' },
    { id: 'T', name: 'T', color: 'bg-[#e91e63]', desc: 'Phase T' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {gates.map((gate) => (
        <button
          key={gate.id}
          onClick={() => onAdd(gate.id)}
          onMouseEnter={() => onPreview(gate.id)}
          onMouseLeave={() => onPreview(null)}
          className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
        >
          <div className={`w-10 h-10 ${gate.color} rounded-xl shadow-md flex items-center justify-center font-black text-white group-hover:scale-110 transition-transform`}>
            {gate.name}
          </div>
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{gate.desc}</span>
        </button>
      ))}
    </div>
  );
};

export default GatePanel;
