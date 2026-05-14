import React from 'react';
import { 
  Compass, 
  RotateCw, 
  Zap, 
  Globe, 
  BookOpen, 
  Cpu, 
  Github, 
  ArrowRight,
  Info
} from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import QuantumBackground from './QuantumBackground';

const AboutPage = ({ onLaunch }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0e1322] text-[#dee1f7] font-body-md selection:bg-cyan-500/30 antialiased relative scroll-smooth">
      <QuantumBackground />
      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 220, 229, 0.15) 1px, transparent 0)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10">
        {/* Hero Section (Enterprise Style) */}
        <section className="min-h-[90vh] flex items-center px-8 md:px-24 overflow-hidden">
          <div className="max-w-5xl py-20">
            <div className="inline-block px-4 py-1 border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
              Enterprise v4.0 Release
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95]">
              Evolving <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Quantum Intelligence</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-medium">
              The world's most precise quantum simulator, now optimized for high-performance distributed architectures. 
              Model complex decoherence with mathematical absolute certainty.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={onLaunch}
                className="bg-cyan-400 text-[#002021] px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(0,245,255,0.3)]">
                Launch Console <ArrowRight size={16} />
              </button>
              <button className="border border-white/20 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-md transition-all">
                View Architecture
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-8 pb-32">
          
          {/* Core Competencies */}
          <section className="mb-40">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl font-black mb-6 tracking-tight text-white uppercase">Core Competencies</h2>
                <p className="text-gray-400 text-lg font-medium">Engineered for the rigorous demands of quantum algorithm development and research.</p>
              </div>
              <div className="text-cyan-400 font-black text-[10px] uppercase tracking-widest border-b border-cyan-400/50 pb-2">
                01 // Architectural Overview
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1a1f2f]/40 backdrop-blur-xl p-10 border border-white/5 group hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-1 bg-cyan-400 mb-8 group-hover:w-24 transition-all duration-500"></div>
                <Cpu className="text-cyan-400 mb-6" size={32} />
                <h3 className="text-xl font-black text-white mb-4 uppercase">Temporal Fidelity</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Nano-second precision gate operations matching the latest superconducting hardware specs.</p>
              </div>
              <div className="bg-[#1a1f2f]/40 backdrop-blur-xl p-10 border border-white/5 group hover:border-purple-500/30 transition-all">
                <div className="w-12 h-1 bg-purple-400 mb-8 group-hover:w-24 transition-all duration-500"></div>
                <Globe className="text-purple-400 mb-6" size={32} />
                <h3 className="text-xl font-black text-white mb-4 uppercase">50+ Qubit Capacity</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Utilizing tensor network optimization for complex multi-qubit entanglement simulations.</p>
              </div>
              <div className="bg-[#1a1f2f]/40 backdrop-blur-xl p-10 border border-white/5 group hover:border-white/30 transition-all">
                <div className="w-12 h-1 bg-white mb-8 group-hover:w-24 transition-all duration-500"></div>
                <Zap className="text-white mb-6" size={32} />
                <h3 className="text-xl font-black text-white mb-4 uppercase">State Tomography</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Full state-vector visualization and density matrix analysis in real-time execution.</p>
              </div>
            </div>
          </section>

          {/* Visualization Section (Jonvet Inspired) */}
          <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Educational Core</div>
              <h2 className="text-5xl font-black mb-8 text-white tracking-tight leading-tight">
                Quantum Logic <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Deep Dive.</span>
              </h2>
              
              <div className="space-y-10">
                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    The Computational Basis
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-cyan-500/50 transition-colors">
                    The <span className="text-cyan-400">North Pole</span> represents |0⟩ and the <span className="text-cyan-400">South Pole</span> represents |1⟩. 
                    This is our default measurement basis (Z-axis). When a qubit is "in between", it exists in a coherent superposition of both states simultaneously.
                  </p>
                </div>

                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Why Phase Matters
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-purple-500/50 transition-colors">
                    Rotating around the Z-axis doesn't change the probability of measuring 0 or 1, but it changes the **Relative Phase**. 
                    This phase shift is the "secret sauce" of quantum algorithms—it determines how the qubit will interfere with itself during later gates.
                  </p>
                </div>

                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    The Conjugate Bases (X & Y)
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-white/50 transition-colors">
                    Beyond the Z-axis, we have the **Equator**. The X-axis points to the |+⟩ and |−⟩ states, while the Y-axis points to |i⟩ and |−i⟩. 
                    Information is never lost; it just shifts into a different perspective.
                  </p>
                </div>

                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    Interference Mechanics
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-yellow-500/50 transition-colors">
                    Superposition allows for **Interference**. Like water waves, quantum states can add up (Constructive) or cancel each other out (Destructive), 
                    leading to the final probability distribution we measure at the end of the circuit.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Decorative Glow */}
              <div className="absolute -inset-10 bg-cyan-500/10 blur-[100px] rounded-full opacity-50 animate-pulse"></div>
              
              <div className="bg-[#1a1f2f]/60 backdrop-blur-2xl p-1 rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10">
                 <div className="bg-[#090e1c] p-8 rounded-xl">
                    <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Telemetry Data</span>
                        <span className="text-xs font-bold text-gray-500">Real-time Interference Analysis</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                      </div>
                    </div>
                  {/* Mock Probability Bars */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-cyan-400">|0⟩ component</span>
                        <span className="text-white">91.9%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 shadow-[0_0_10px_#00f5ff]" style={{ width: '91.9%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-purple-400">|1⟩ component</span>
                        <span className="text-white">8.1%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 shadow-[0_0_10px_#ecb1ff]" style={{ width: '8.1%' }}></div>
                      </div>
                    </div>
                  </div>
                  {/* Mock Waveform Icon */}
                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center">
                    <div className="w-full h-24 relative flex items-center justify-center overflow-hidden">
                       <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" 
                            style={{ clipPath: 'polygon(0% 50%, 5% 45%, 10% 55%, 15% 40%, 20% 60%, 25% 35%, 30% 65%, 35% 30%, 40% 70%, 45% 25%, 50% 75%, 55% 20%, 60% 80%, 65% 15%, 70% 85%, 75% 10%, 80% 90%, 85% 5%, 90% 95%, 95% 0%, 100% 100%)' }} />
                       <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 z-10 bg-[#090e1c] px-4">Interference Pattern Detected</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

          {/* The Gates Library */}
          <section className="mb-40">
            <div className="mb-20">
               <h2 className="text-4xl font-black mb-6 tracking-tight text-white uppercase">The Quantum Engine</h2>
               <p className="text-gray-400 text-lg font-medium">universal gate sets processed with zero floating-point drift.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GateExplainer name="H" description="The fundamental superposition gate. Maps |0⟩ to (|0⟩ + |1⟩)/√2." geometric="180° rotation around the diagonal X+Z axis." matrix="H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}" />
              <GateExplainer name="X" description="The quantum NOT gate. Flips the qubit state entirely." geometric="180° rotation around the X-axis." matrix="X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}" />
              <GateExplainer name="CN" description="Essential for entanglement. Flips target if control is |1⟩." geometric="2-qubit controlled unitary operation." matrix="CNOT = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}" />
              <GateExplainer name="CCX" description="Toffoli gate. A 3-qubit universal gate for classical logic." geometric="Double-controlled NOT operation." matrix="CCNOT = \text{Universal}" />
              <GateExplainer name="S" description="A phase gate adding a complex 90° rotation." geometric="90° rotation around the Z-axis." matrix="S = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}" />
              <GateExplainer name="T" description="Critical eighth-turn phase gate for universal computing." geometric="45° rotation around the Z-axis." matrix="T = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}" />
            </div>
          </section>

          {/* Unique Features Section */}
          <section className="mb-40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#1a1f2f]/40 p-12 border border-white/5 group hover:border-cyan-500/30 transition-all">
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Trajectory Trails</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8">
                  Unlike typical simulators that show instant "jumps", we trace the **Physical Pathway** with glowing curves, 
                  revealing the geometric beauty of the unitary transformation.
                </p>
                <div className="h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400 w-1/2 animate-pulse shadow-[0_0_15px_#00f5ff]"></div>
                </div>
              </div>
              <div className="bg-[#1a1f2f]/40 p-12 border border-white/5 group hover:border-purple-500/30 transition-all">
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Live Linear Algebra</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8">
                  We don't hide the math. The "Step-by-Step Math" panel breaks down the matrix multiplication 
                  for every interaction with LaTeX precision.
                </p>
                <div className="flex justify-center text-purple-300 font-code-md text-sm">
                   <InlineMath math="\alpha|0\rangle + \beta|1\rangle" />
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 p-20 text-center rounded-[40px] relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to lead the <br/> <span className="text-cyan-400">Quantum Advantage?</span></h2>
              <p className="text-gray-400 mb-12 max-w-xl mx-auto font-medium">Enterprise solutions for laboratories, research institutions, and defense contractors.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={onLaunch}
                  className="bg-white text-[#0e1322] px-12 py-5 font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl">
                  Get Enterprise Access
                </button>
                <button className="border border-white/40 text-white px-12 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 backdrop-blur-md transition-all">
                  Talk to an Engineer
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

const GateExplainer = ({ name, description, geometric, matrix }) => (
  <div className="bg-[#1a1f2f]/40 p-8 border border-white/5 hover:border-cyan-500/30 transition-all group backdrop-blur-xl">
    <div className="flex justify-between items-start mb-6">
      <div className="w-10 h-10 bg-cyan-400 text-[#002021] flex items-center justify-center font-black text-lg">{name}</div>
      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
        Rotation
      </div>
    </div>
    <p className="text-xs text-gray-400 font-medium leading-relaxed mb-6">{description}</p>
    <div className="bg-black/20 p-4 mb-4 border border-white/5">
      <div className="text-[9px] font-black text-gray-600 uppercase mb-2 tracking-widest">Effect</div>
      <div className="text-cyan-100 font-bold text-xs italic opacity-80">
        {geometric}
      </div>
    </div>
    <div className="text-sm opacity-60 scale-90 origin-left">
      <InlineMath math={matrix} />
    </div>
  </div>
);

export default AboutPage;
