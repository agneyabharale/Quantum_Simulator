import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { InlineMath, BlockMath } from 'react-katex';

const MathBreakdown = () => {
  const simulation = useCircuitStore((state) => state.simulation);
  const gates = useCircuitStore((state) => state.gates);
  const currentStep = useCircuitStore((state) => state.currentStep);

  if (!simulation) return null;

  // If no gates applied and not manual set, show placeholder
  const isInitial = gates.length === 0 && !simulation.bloch;
  
  if (isInitial) {
    return (
      <div className="text-[11px] text-gray-400 italic text-center py-4 uppercase tracking-widest opacity-40">
        Apply a gate or adjust angles to begin.
      </div>
    );
  }

  // Determine active data based on step mode
  const isActiveStep = currentStep !== -1 && simulation.history && simulation.history[currentStep];
  const activeData = isActiveStep ? simulation.history[currentStep] : simulation;
  const stepIdx = isActiveStep ? currentStep : Math.max(0, gates.length - 1);
  const gateName = isActiveStep ? activeData.gate : (gates.length > 0 ? gates[gates.length - 1] : "MANUAL_SET");

  const statevector = activeData.statevector;
  const last_matrix = activeData.matrix || simulation.last_gate_matrix;
  const prev_state = activeData.prev_state || simulation.previous_state;

  const fmt = (c) => {
    if (!c || !Array.isArray(c)) return '0';
    const [re, im] = c;
    if (typeof re !== 'number' || typeof im !== 'number') return '0';
    if (Math.abs(im) < 0.001) return re.toFixed(2);
    if (Math.abs(re) < 0.001) return `${im.toFixed(2)}i`;
    return `${re.toFixed(2)}${im > 0 ? '+' : '-'}${Math.abs(im).toFixed(2)}i`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 bg-white/2 rounded-2xl border border-white/5 shadow-2xl">
        <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#00f5ff]" />
          TRANSFORMATION_{stepIdx + 1}: {gateName}
        </h4>
        
        <div className="overflow-x-auto py-4 bg-white/2 rounded-xl border border-white/5">
          <div className="scale-90 origin-center text-white/90 invert-[0.1]">
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
      </div>

      <div className="flex flex-col gap-4 px-1">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-[0.15em]">Computation Engine Log</span>
        <div className="space-y-4">
          <div className="flex gap-4 items-baseline group">
            <span className="text-[15px] font-bold text-cyan-400">α' =</span>
            <span className="text-[14px] font-medium text-white/60 font-mono tracking-tight group-hover:text-white/90 transition-colors">
              ({fmt(last_matrix[0][0])} × {fmt(prev_state[0])}) + ({fmt(last_matrix[0][1])} × {fmt(prev_state[1])})
            </span>
          </div>
          <div className="flex gap-4 items-baseline group">
            <span className="text-[15px] font-bold text-cyan-400">β' =</span>
            <span className="text-[14px] font-medium text-white/60 font-mono tracking-tight group-hover:text-white/90 transition-colors">
              ({fmt(last_matrix[1][0])} × {fmt(prev_state[0])}) + ({fmt(last_matrix[1][1])} × {fmt(prev_state[1])})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathBreakdown;
