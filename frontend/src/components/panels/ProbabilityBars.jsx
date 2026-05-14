import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';

const CombinedWaveViz = ({ amp1, amp2, color1, color2, label1, label2, title, border }) => {
  const points1 = [];
  const points2 = [];
  const width = 340; // Bigger graph
  const height = 100; // Bigger graph
  
  const time = performance.now() / 20; 
  
  const mag1 = Math.sqrt(amp1[0]**2 + amp1[1]**2);
  const ang1 = Math.atan2(amp1[1], amp1[0]);
  const mag2 = Math.sqrt(amp2[0]**2 + amp2[1]**2);
  const ang2 = Math.atan2(amp2[1], amp2[0]);
  
  const dotX = time % width;
  const waveFn1 = (x) => (height / 2) - (mag1 * 40 * Math.sin(x / 25 + ang1));
  const waveFn2 = (x) => (height / 2) - (mag2 * 40 * Math.sin(x / 25 + ang2));

  const dotY1 = waveFn1(dotX);
  const dotY2 = waveFn2(dotX);

  for (let x = 0; x <= width; x += 2) {
    points1.push(`${x},${waveFn1(x)}`);
    points2.push(`${x},${waveFn2(x)}`);
  }
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end px-1">
        <span className={`text-[12px] font-medium uppercase tracking-[0.1em] border-l-2 ${border} pl-3 text-white/80`}>{title}</span>
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: color1 }} />
             <span className="text-[10px] font-normal text-white/50 uppercase">{label1} component</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: color2 }} />
             <span className="text-[10px] font-normal text-white/50 uppercase">{label2} component</span>
           </div>
        </div>
      </div>
      <div className="relative bg-[#111827] rounded-xl border border-white/5 shadow-2xl overflow-hidden">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Fainter grid lines */}
          <line x1="0" y1={height/4} x2={width} y2={height/4} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="0" y1={3*height/4} x2={width} y2={3*height/4} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          
          <polyline fill="none" stroke={color2} strokeWidth="1.2" points={points2.join(' ')} className="opacity-60" />
          <polyline fill="none" stroke={color1} strokeWidth="1.2" points={points1.join(' ')} />

          <circle cx={dotX} cy={dotY2} r="3" fill={color2} className="opacity-80" />
          <circle cx={dotX} cy={dotY1} r="3" fill={color1} />
        </svg>
      </div>
    </div>
  );
};

const ProbabilityBars = () => {
  const simulation = useCircuitStore((state) => state.simulation);
  const currentStep = useCircuitStore((state) => state.currentStep);
  const setStateByAngles = useCircuitStore(state => state.setStateByAngles);

  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30);
    return () => clearInterval(interval);
  }, []);

  if (!simulation) return null;

  const activeData = (currentStep !== -1 && simulation.history && simulation.history[currentStep]) 
    ? simulation.history[currentStep] 
    : simulation;

  const { statevector } = activeData;
  const z0 = statevector[0];
  const z1 = statevector[1];

  const x_p = [(z0[0] + z1[0]) / Math.sqrt(2), (z0[1] + z1[1]) / Math.sqrt(2)];
  const x_m = [(z0[0] - z1[0]) / Math.sqrt(2), (z0[1] - z1[1]) / Math.sqrt(2)];
  const y_p = [(z0[0] - z1[1]) / Math.sqrt(2), (z0[1] + z1[0]) / Math.sqrt(2)];
  const y_m = [(z0[0] + z1[1]) / Math.sqrt(2), (z0[1] - z1[0]) / Math.sqrt(2)];

  const mag0 = Math.sqrt(z0[0]**2 + z0[1]**2);
  const thetaVal = (2 * Math.acos(Math.min(1, mag0)) * 180 / Math.PI);
  const phase0 = Math.atan2(z0[1], z0[0]);
  const phase1 = Math.atan2(z1[1], z1[0]);
  const phiVal = (((phase1 - phase0) * 180 / Math.PI + 360) % 360);

  const incrementTheta = (dir) => setStateByAngles(Math.min(180, Math.max(0, thetaVal + dir * 1.0)), phiVal);
  const incrementPhi = (dir) => setStateByAngles(thetaVal, (phiVal + dir * 1.0 + 360) % 360);

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Probability Bars (Restored) */}
      <div className="space-y-4 mb-2">
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium text-white/60 uppercase tracking-wider px-1">
            <span>|0⟩ Probability</span>
            <span className="text-white/80">{(mag0**2 * 100).toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all duration-300" 
              style={{ width: `${mag0**2 * 100}%` }} 
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium text-white/60 uppercase tracking-wider px-1">
            <span>|1⟩ Probability</span>
            <span className="text-white/80">{((1-mag0**2) * 100).toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all duration-300" 
              style={{ width: `${(1-mag0**2) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5 mx-1" />

      <h3 className="text-[12px] font-medium text-white/70 uppercase tracking-[0.1em] mb-2 px-1">Real part of probability amplitudes</h3>

      {/* Angles Header with Draggers */}
      <div className="flex flex-col gap-4 mb-2">
        {/* Theta Controller */}
        <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 flex flex-col gap-4 group">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-cyan-400/80 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
              Latitude (θ)
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => incrementTheta(-1)} className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-white/60 text-sm">-</button>
              <span className="text-[14px] font-medium text-white min-w-[50px] text-center">{Math.round(thetaVal)}°</span>
              <button onClick={() => incrementTheta(1)} className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-white/60 text-sm">+</button>
            </div>
          </div>
          <input 
            type="range" min="0" max="180" step="1"
            value={Math.round(thetaVal)}
            onChange={(e) => setStateByAngles(parseInt(e.target.value), Math.round(phiVal))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400/60"
          />
        </div>

        {/* Phi Controller */}
        <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 flex flex-col gap-4 group">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-purple-400/80 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50" />
              Longitude (φ)
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => incrementPhi(-1)} className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-white/60 text-sm">-</button>
              <span className="text-[14px] font-medium text-white min-w-[50px] text-center">{Math.round(phiVal)}°</span>
              <button onClick={() => incrementPhi(1)} className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-white/60 text-sm">+</button>
            </div>
          </div>
          <input 
            type="range" min="0" max="360" step="1"
            value={Math.round(phiVal)}
            onChange={(e) => setStateByAngles(Math.round(thetaVal), parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400/60"
          />
        </div>
      </div>

      {/* Basis Sections */}
      <div className="space-y-10">
        <CombinedWaveViz 
          amp1={z0} amp2={z1} 
          color1="#1e40af" color2="#60a5fa" 
          label1="|0⟩" label2="|1⟩" 
          title="z-Basis" border="border-blue-600" 
        />
        <CombinedWaveViz 
          amp1={x_p} amp2={x_m} 
          color1="#991b1b" color2="#f87171" 
          label1="|+⟩" label2="|-⟩" 
          title="x-Basis" border="border-red-600" 
        />
        <CombinedWaveViz 
          amp1={y_p} amp2={y_m} 
          color1="#166534" color2="#4ade80" 
          label1="|i⟩" label2="|-i⟩" 
          title="y-Basis" border="border-green-600" 
        />
      </div>
    </div>
  );
};

export default ProbabilityBars;
