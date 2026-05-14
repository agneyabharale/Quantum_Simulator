import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useCircuitStore } from '../../store/useCircuitStore';

const MatrixPanel = () => {
  const simulation = useCircuitStore((state) => state.simulation);
  const gates = useCircuitStore((state) => state.gates);

  if (!simulation) return null;

  // Format complex numbers for LaTeX
  const fmt = (c) => {
    if (!c) return '0';
    const [re, im] = c;
    if (Math.abs(im) < 0.001) return re.toFixed(2);
    if (Math.abs(re) < 0.001) return `${im.toFixed(2)}i`;
    return `(${re.toFixed(2)} ${im > 0 ? '+' : '-'} ${Math.abs(im).toFixed(2)}i)`;
  };

  const statevector = simulation.statevector || simulation.state_vector;
  const last_matrix = simulation.last_gate_matrix || simulation.last_matrix;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">State Vector |ψ⟩</span>
        <div className="p-5 bg-white/2 rounded-2xl border border-white/5 flex justify-center shadow-2xl">
          <div className="text-white/80 invert-[0.1]">
            <InlineMath math={`\\begin{pmatrix} ${fmt(statevector[0])} \\\\ ${fmt(statevector[1])} \\end{pmatrix}`} />
          </div>
        </div>
      </div>

      {last_matrix && (
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Operator Matrix (U)</span>
          <div className="p-5 bg-white/2 rounded-2xl border border-white/5 flex justify-center shadow-2xl">
            <div className="text-white/80 invert-[0.1]">
              <InlineMath math={`
                \\begin{pmatrix} 
                  ${fmt(last_matrix[0][0])} & ${fmt(last_matrix[0][1])} \\\\
                  ${fmt(last_matrix[1][0])} & ${fmt(last_matrix[1][1])}
                \\end{pmatrix}
              `} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixPanel;
