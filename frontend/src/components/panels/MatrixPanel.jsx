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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State Vector |ψ⟩</span>
        <div className="p-3 bg-gray-50 rounded border border-gray-100 flex justify-center">
          <InlineMath math={`\\begin{pmatrix} ${fmt(statevector[0])} \\\\ ${fmt(statevector[1])} \\end{pmatrix}`} />
        </div>
      </div>

      {last_matrix && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Matrix U</span>
          <div className="p-3 bg-gray-50 rounded border border-gray-100 flex justify-center">
            <InlineMath math={`
              \\begin{pmatrix} 
                ${fmt(last_matrix[0][0])} & ${fmt(last_matrix[0][1])} \\\\
                ${fmt(last_matrix[1][0])} & ${fmt(last_matrix[1][1])}
              \\end{pmatrix}
            `} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixPanel;
