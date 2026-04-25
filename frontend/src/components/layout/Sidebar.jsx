import React, { useState } from 'react';
import GatePanel from '../gates/GatePanel';
import RotationPanel from '../gates/RotationPanel';
import MatrixPanel from '../panels/MatrixPanel';
import ProbabilityBars from '../panels/ProbabilityBars';
import { ChevronDown, ChevronRight, LayoutGrid, Rotate3d, BarChart3, Hash } from 'lucide-react';

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }) => (
  <div className="accordion-item">
    <div className="accordion-header" onClick={onClick}>
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-[#3f51b5]" />
        <span className="text-sm tracking-tight">{title}</span>
      </div>
      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </div>
    {isOpen && (
      <div className="accordion-content animate-fade-in">
        {children}
      </div>
    )}
  </div>
);

const Sidebar = () => {
  const [openSection, setOpenSection] = useState('gates');

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <AccordionItem 
        title="OPERATIONS" 
        icon={LayoutGrid} 
        isOpen={openSection === 'gates'} 
        onClick={() => toggle('gates')}
      >
        <GatePanel />
      </AccordionItem>

      <AccordionItem 
        title="ROTATIONS" 
        icon={Rotate3d} 
        isOpen={openSection === 'rotations'} 
        onClick={() => toggle('rotations')}
      >
        <RotationPanel />
      </AccordionItem>

      <AccordionItem 
        title="AMPLITUDES & PROBABILITIES" 
        icon={BarChart3} 
        isOpen={openSection === 'probs'} 
        onClick={() => toggle('probs')}
      >
        <ProbabilityBars />
      </AccordionItem>

      <AccordionItem 
        title="STATE MATRIX" 
        icon={Hash} 
        isOpen={openSection === 'matrix'} 
        onClick={() => toggle('matrix')}
      >
        <MatrixPanel />
      </AccordionItem>
      
      <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Instructions</h4>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Click on gates to apply them to the qubit. The Bloch sphere shows the geometric representation, while the panels show the mathematical state.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
