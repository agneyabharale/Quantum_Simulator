import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCircuitStore } from '../../store/useCircuitStore';

const CircuitDisplay = () => {
  const { gates, currentStep, nextStep, prevStep, setCurrentStep } = useCircuitStore();

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
      default: return 'bg-indigo-600';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quantum Circuit Timeline</h3>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setCurrentStep(currentStep === -1 ? gates.length - 1 : -1)}
              className={`px-3 py-1 text-[9px] font-black rounded-md transition-all ${currentStep !== -1 ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              STEP MODE
            </button>
          </div>
          {currentStep !== -1 && (
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button 
                onClick={prevStep}
                disabled={currentStep <= 0}
                className="p-1 text-gray-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[9px] font-black text-gray-400 w-8 text-center">{currentStep + 1} / {gates.length}</span>
              <button 
                onClick={nextStep}
                disabled={currentStep >= gates.length - 1}
                className="p-1 text-gray-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="h-24 flex items-center gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {gates.length === 0 ? (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Circuit is empty. Add a gate from the sidebar.</span>
          </div>
        ) : (
          gates.map((gate, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col items-center gap-2 group cursor-pointer transition-all ${currentStep === idx ? 'scale-110' : ''}`}
              onClick={() => setCurrentStep(idx)}
            >
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg transition-all
                  ${getGateColor(gate)}
                  ${currentStep === idx ? 'ring-4 ring-indigo-200 scale-105' : 'group-hover:scale-105'}
                `}
              >
                {gate.includes('Rx') ? 'Rx' : gate.includes('Ry') ? 'Ry' : gate.includes('Rz') ? 'Rz' : gate}
              </div>
              <span className={`text-[8px] font-black tracking-widest ${currentStep === idx ? 'text-indigo-600' : 'text-gray-300'}`}>{idx + 1}</span>
              
              {/* Connector line */}
              {idx < gates.length - 1 && (
                <div className="absolute top-5 -right-3 w-3 h-[1px] bg-gray-200" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CircuitDisplay;
