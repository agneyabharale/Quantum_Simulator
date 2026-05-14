import React, { useState } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { Sliders, PlusCircle } from 'lucide-react';

const CustomRotationPanel = () => {
  const addGate = useCircuitStore((state) => state.addGate);
  const isLoading = useCircuitStore((state) => state.isLoading);
  
  const [axis, setAxis] = useState('Rx');
  const [angle, setAngle] = useState(90); // Default to 90 degrees

  const handleApply = () => {
    // Convert angle to radians for the backend
    const radians = (angle * Math.PI) / 180;
    const gateString = `${axis}(${radians.toFixed(3)})`;
    addGate(gateString);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Axis Selection */}
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
        {['Rx', 'Ry', 'Rz'].map((a) => (
          <button
            key={a}
            onClick={() => setAxis(a)}
            className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest ${
              axis === a ? 'bg-cyan-500 shadow-lg text-[#002021]' : 'text-gray-500 hover:text-white'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Angle Slider */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Rotation (θ)</span>
          <span className="text-[10px] font-black text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/20">
            {angle}°
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[8px] text-gray-600 font-black px-1 uppercase tracking-widest">
          <span>0°</span>
          <span>180°</span>
          <span>360°</span>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        disabled={isLoading}
        className="w-full py-3.5 bg-white/5 text-white border border-white/10 rounded-xl font-black text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50 shadow-2xl uppercase tracking-[0.2em]"
      >
        <PlusCircle size={14} className="text-cyan-400" />
        Commit Rotation
      </button>

      {/* Quick Presets */}
      <div className="grid grid-cols-4 gap-2">
        {[45, 90, 180, 270].map((p) => (
          <button
            key={p}
            onClick={() => setAngle(p)}
            className="py-1.5 text-[9px] font-black text-gray-500 bg-white/2 border border-white/5 rounded-lg hover:bg-white/5 hover:text-cyan-400 transition-all uppercase"
          >
            {p}°
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomRotationPanel;
