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
  <div className="accordion-item">
    <div className="accordion-header" onClick={onClick}>
      <div className="flex items-center gap-3">
        <Icon size={16} className={`${isOpen ? 'text-cyan-400' : 'text-gray-500'}`} />
        <span className={`${isOpen ? 'text-white' : 'text-gray-500'}`}>{title}</span>
      </div>
      {isOpen ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
    </div>
    {isOpen && (
      <div className="accordion-content animate-fade-in">
        {children}
      </div>
    )}
  </div>
);

const Sidebar = () => {
  const { addGate, setPreviewGate } = useCircuitStore();
  
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
    <div className="flex flex-col h-full bg-[#0e1322]">
      <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
        <h2 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Control Center</h2>
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
      
      <div className="p-8 bg-white/2 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#00f5ff]" />
          <h4 className="text-[9px] font-black text-white uppercase tracking-widest opacity-60">System Online</h4>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
          Universal gate set processed with zero floating-point drift. Apply transformations to map the Hilbert space.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
