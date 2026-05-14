import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCircuitStore } from '../../store/useCircuitStore';

const CircuitDisplay = () => {
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Circuit Timeline</h3>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 rounded-md p-0.5 border border-white/5">
            <button 
              onClick={() => setCurrentStep(currentStep === -1 ? gates.length - 1 : -1)}
              className={`px-3 py-0.5 text-[8px] font-black rounded transition-all uppercase tracking-widest ${currentStep !== -1 ? 'bg-cyan-500 text-[#002021] shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              STEP MODE
            </button>
          </div>
          {currentStep !== -1 && (
            <div className="flex items-center gap-1 bg-white/5 rounded-md p-0.5 border border-white/5">
              <button 
                onClick={prevStep}
                disabled={currentStep <= 0}
                className="p-1 text-gray-400 hover:text-cyan-400 disabled:opacity-10 transition-colors"
              >
                <ChevronLeft size={12} />
              </button>
              <span className="text-[9px] font-black text-white w-8 text-center tracking-tighter opacity-60">{currentStep + 1}/{gates.length}</span>
              <button 
                onClick={nextStep}
                disabled={currentStep >= gates.length - 1}
                className="p-1 text-gray-400 hover:text-cyan-400 disabled:opacity-10 transition-colors"
              >
                <ChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="h-16 flex items-center gap-4 overflow-x-auto px-4 pb-1 scrollbar-hide">
        {gates.length === 0 ? (
          <div className="flex-1 h-full flex items-center justify-center border border-dashed border-white/5 rounded-xl bg-white/2">
            <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.4em]">Empty Stack</span>
          </div>
        ) : (
          gates.map((gate, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col items-center gap-1.5 group cursor-pointer transition-all ${currentStep === idx ? 'scale-105' : ''}`}
              onClick={() => setCurrentStep(idx)}
            >
              <div 
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-white shadow-xl transition-all text-[10px]
                  ${getGateColor(gate)}
                  ${currentStep === idx ? 'ring-2 ring-cyan-400/50 scale-105' : 'group-hover:scale-105 opacity-70 group-hover:opacity-100'}
                `}
              >
                {gate.startsWith('MANUAL') ? 'SET' : gate.includes('Rx') ? 'Rx' : gate.includes('Ry') ? 'Ry' : gate.includes('Rz') ? 'Rz' : gate}
              </div>
              <span className={`text-[7px] font-black tracking-widest ${currentStep === idx ? 'text-cyan-400' : 'text-gray-600'}`}>S{idx + 1}</span>
              
              {/* Connector line */}
              {idx < gates.length - 1 && (
                <div className="absolute top-4.5 -right-3 w-3 h-[1px] bg-white/5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CircuitDisplay;
