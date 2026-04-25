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
    <div className="flex flex-col gap-4">
      {/* Axis Selection */}
      <div className="flex bg-gray-100 p-1 rounded-lg">
        {['Rx', 'Ry', 'Rz'].map((a) => (
          <button
            key={a}
            onClick={() => setAxis(a)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
              axis === a ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Angle Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Angle (θ)</span>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
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
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-[8px] text-gray-400 font-bold px-1">
          <span>0°</span>
          <span>180°</span>
          <span>360°</span>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        disabled={isLoading}
        className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-indigo-200"
      >
        <PlusCircle size={14} />
        APPLY ROTATION
      </button>

      {/* Quick Presets */}
      <div className="grid grid-cols-4 gap-1.5 mt-1">
        {[45, 90, 180, 270].map((p) => (
          <button
            key={p}
            onClick={() => setAngle(p)}
            className="py-1 text-[9px] font-bold text-gray-500 bg-gray-50 border border-gray-100 rounded hover:bg-gray-100 transition-colors"
          >
            {p}°
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomRotationPanel;
