import React, { useState } from 'react';
import GatePanel from '../gates/GatePanel';
import RotationPanel from '../gates/RotationPanel';
import CustomRotationPanel from '../gates/CustomRotationPanel';
import MatrixPanel from '../panels/MatrixPanel';
import ProbabilityBars from '../panels/ProbabilityBars';
import MathBreakdown from '../panels/MathBreakdown';
import { ChevronDown, ChevronRight, LayoutGrid, Rotate3d, BarChart3, Hash, Sliders, BookOpen } from 'lucide-react';
import { useCircuitStore } from '../../store/useCircuitStore';

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }) => (
  <div className="accordion-item border-b border-gray-100">
    <div className="accordion-header px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors select-none" onClick={onClick}>
      <div className="flex items-center gap-3">
        <Icon size={18} className={`${isOpen ? 'text-indigo-600' : 'text-gray-400'}`} />
        <span className={`text-[11px] font-bold uppercase tracking-wider ${isOpen ? 'text-indigo-900' : 'text-gray-500'}`}>{title}</span>
      </div>
      {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
    </div>
    {isOpen && (
      <div className="accordion-content px-5 pb-5 animate-fade-in bg-white">
        {children}
      </div>
    )}
  </div>
);

const Sidebar = () => {
  const { addGate, setPreviewGate } = useCircuitStore();
  
  // Use an object to track multiple open sections
  const [openSections, setOpenSections] = useState({
    gates: true,
    rotations: false,
    custom: false,
    probs: true,
    math: true,
    matrix: false
  });

  const toggle = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-xl">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Control Center</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AccordionItem 
          title="Standard Gates" 
          icon={LayoutGrid} 
          isOpen={openSections.gates} 
          onClick={() => toggle('gates')}
        >
          <GatePanel onAdd={addGate} onPreview={setPreviewGate} />
        </AccordionItem>

        <AccordionItem 
          title="Fixed Rotations" 
          icon={Rotate3d} 
          isOpen={openSections.rotations} 
          onClick={() => toggle('rotations')}
        >
          <RotationPanel />
        </AccordionItem>

        <AccordionItem 
          title="Custom Rotation" 
          icon={Sliders} 
          isOpen={openSections.custom} 
          onClick={() => toggle('custom')}
        >
          <CustomRotationPanel />
        </AccordionItem>

        <AccordionItem 
          title="Amplitudes & Prob" 
          icon={BarChart3} 
          isOpen={openSections.probs} 
          onClick={() => toggle('probs')}
        >
          <ProbabilityBars />
        </AccordionItem>

        <AccordionItem 
          title="Step-by-Step Math" 
          icon={BookOpen} 
          isOpen={openSections.math} 
          onClick={() => toggle('math')}
        >
          <MathBreakdown />
        </AccordionItem>

        <AccordionItem 
          title="State Matrix" 
          icon={Hash} 
          isOpen={openSections.matrix} 
          onClick={() => toggle('matrix')}
        >
          <MatrixPanel />
        </AccordionItem>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Simulator Active</h4>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
          Apply arbitrary rotations around any axis to explore the full Hilbert space of the qubit.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
