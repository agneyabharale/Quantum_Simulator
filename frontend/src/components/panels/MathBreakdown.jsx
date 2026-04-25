import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { InlineMath, BlockMath } from 'react-katex';

const MathBreakdown = () => {
  const simulation = useCircuitStore((state) => state.simulation);
  const gates = useCircuitStore((state) => state.gates);
  const currentStep = useCircuitStore((state) => state.currentStep);

  if (!simulation || gates.length === 0) {
    return (
      <div className="text-[11px] text-gray-400 italic text-center py-4">
        Apply a gate to see the mathematical transformation.
      </div>
    );
  }

  // Determine active data based on step mode
  const isActiveStep = currentStep !== -1 && simulation.history && simulation.history[currentStep];
  const activeData = isActiveStep ? simulation.history[currentStep] : simulation;
  const stepIdx = isActiveStep ? currentStep : gates.length - 1;
  const gateName = isActiveStep ? activeData.gate : gates[gates.length - 1];

  const statevector = activeData.statevector;
  const last_matrix = activeData.matrix || simulation.last_gate_matrix;
  const prev_state = activeData.prev_state || simulation.previous_state;

  const fmt = (c) => {
    if (!c) return '0';
    const [re, im] = c;
    if (Math.abs(im) < 0.001) return re.toFixed(2);
    if (Math.abs(re) < 0.001) return `${im.toFixed(2)}i`;
    return `${re.toFixed(2)}${im > 0 ? '+' : '-'}${Math.abs(im).toFixed(2)}i`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
        <h4 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          Step {stepIdx + 1}: {gateName} Gate
        </h4>
        
        <div className="overflow-x-auto py-2">
          <BlockMath math={`
            \\underbrace{
              \\begin{pmatrix} 
                ${fmt(last_matrix[0][0])} & ${fmt(last_matrix[0][1])} \\\\
                ${fmt(last_matrix[1][0])} & ${fmt(last_matrix[1][1])}
              \\end{pmatrix}
            }_{U}
            \\underbrace{
              \\begin{pmatrix} 
                ${fmt(prev_state[0])} \\\\
                ${fmt(prev_state[1])}
              \\end{pmatrix}
            }_{|\\psi_{old}\\rangle}
            =
            \\underbrace{
              \\begin{pmatrix} 
                ${fmt(statevector[0])} \\\\
                ${fmt(statevector[1])}
              \\end{pmatrix}
            }_{|\\psi_{new}\\rangle}
          `} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Calculation Details</span>
        <div className="text-[11px] font-mono text-gray-600 space-y-1">
          <div className="flex gap-2">
            <span className="text-indigo-600 font-bold">α' =</span>
            <span>({fmt(last_matrix[0][0])} × {fmt(prev_state[0])}) + ({fmt(last_matrix[0][1])} × {fmt(prev_state[1])})</span>
          </div>
          <div className="flex gap-2">
            <span className="text-indigo-600 font-bold">β' =</span>
            <span>({fmt(last_matrix[1][0])} × {fmt(prev_state[0])}) + ({fmt(last_matrix[1][1])} × {fmt(prev_state[1])})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathBreakdown;
