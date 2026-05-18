import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCircuitStore } from '../../store/useCircuitStore';

const CircuitDisplay = ({ zoomScale = 1 }) => {
  const { gates, currentStep, nextStep, prevStep, setCurrentStep } = useCircuitStore();

  const getGateColor = (gate) => {
    if (gate.includes('Rx')) return 'bg-[#ff5252]';
    if (gate.includes('Ry')) return 'bg-[#4caf50]';
    if (gate.includes('Rz')) return 'bg-[#2196f3]';
    if (gate.startsWith('MANUAL')) return 'bg-[#818cf8]'; // Indigo for manual sets
    switch (gate) {
      case 'X': return 'bg-[#ff5252]';
      case 'Y': return 'bg-[#4caf50]';
      case 'Z': return 'bg-[#2196f3]';
      case 'H': return 'bg-[#ffc107]';
      case 'S': return 'bg-[#9c27b0]';
      case 'T': return 'bg-[#e91e63]';
      default: return 'bg-indigo-600';
    }
  };

  return (
    <div 
      style={{
        height: `${80 * zoomScale}px`,
        gap: `${20 * zoomScale}px`,
        paddingLeft: `${16 * zoomScale}px`,
        paddingRight: `${16 * zoomScale}px`,
      }}
      className="flex items-center overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide w-full"
    >
      {gates.length === 0 ? (
        <div className="flex-1 h-full flex items-center justify-center border border-dashed border-white/5 rounded-xl bg-white/2">
          <span 
            style={{ fontSize: `${13 * zoomScale}px` }}
            className="font-black text-gray-500 uppercase tracking-[0.4em]"
          >
            Empty Stack
          </span>
        </div>
      ) : (
        gates.map((gate, idx) => (
          <div 
            key={idx} 
            style={{ gap: `${4 * zoomScale}px` }}
            className={`relative flex flex-col items-center group cursor-pointer transition-all ${currentStep === idx ? 'scale-105' : ''}`}
            onClick={() => setCurrentStep(idx)}
          >
            <div 
              style={{
                width: `${46 * zoomScale}px`,
                height: `${46 * zoomScale}px`,
                fontSize: `${12 * zoomScale}px`,
              }}
              className={`rounded-xl flex items-center justify-center font-black text-white shadow-xl transition-all
                ${getGateColor(gate)}
                ${currentStep === idx ? 'ring-2 ring-cyan-400/50 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'group-hover:scale-105'}
              `}
            >
              {gate.startsWith('MANUAL') ? 'SET' : gate.includes('Rx') ? 'Rx' : gate.includes('Ry') ? 'Ry' : gate.includes('Rz') ? 'Rz' : gate}
            </div>
            <span 
              style={{ fontSize: `${10 * zoomScale}px` }}
              className={`font-black tracking-widest ${currentStep === idx ? 'text-cyan-400' : 'text-gray-500/80'}`}
            >
              S{idx + 1}
            </span>
            
            {/* Connector line */}
            {idx < gates.length - 1 && (
              <div 
                style={{
                  top: `${23 * zoomScale}px`,
                  right: `-${16 * zoomScale}px`,
                  width: `${16 * zoomScale}px`,
                }}
                className="absolute h-[1px] bg-white/10" 
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CircuitDisplay;
