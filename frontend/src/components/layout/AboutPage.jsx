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

const GateExplainer = ({ name, description, geometric, matrix }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-black text-sm">{name}</div>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
        Geometric Rotation
      </div>
    </div>
    <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">{description}</p>
    <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
      <div className="text-[9px] font-black text-gray-400 uppercase mb-2">Geometric Effect</div>
      <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs italic">
        <RotateCw size={12} className="text-indigo-500" /> {geometric}
      </div>
    </div>
    <div className="bg-indigo-50/30 rounded-xl p-3">
      <div className="text-[9px] font-black text-gray-400 uppercase mb-1">Matrix</div>
      <div className="text-sm scale-90 origin-left overflow-hidden">
        <InlineMath math={matrix} />
      </div>
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">{title}</h3>
    </div>
    <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-8 md:p-16 scroll-smooth">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Info size={12} /> Documentation & Guide
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-[1.1]">
            Thinking Geometrically <br/> 
            <span className="text-indigo-600">About Quantum.</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
            Quantum mechanics is often taught as abstract algebra. We believe it should be felt. 
            This simulator uses the Bloch Sphere to turn complex math into intuitive motion.
          </p>
        </div>

        {/* The Geographic Analogy Section */}
        <div className="mb-24">
          <SectionHeader 
            icon={Globe}
            title="The Geographic Analogy"
            subtitle="The easiest way to understand a qubit is to think of it as a globe."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-wider">The Poles (States)</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                The <span className="text-indigo-600 font-bold">North Pole</span> is the state <InlineMath math="|0\rangle" />. 
                The <span className="text-indigo-600 font-bold">South Pole</span> is the state <InlineMath math="|1\rangle" />. 
                Anywhere else is a mix of both.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-wider">The Equator (Superposition)</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                When the arrow points at the equator, the qubit is in a <span className="text-indigo-600 font-bold">Superposition</span>. 
                Measuring it results in a 50/50 chance of seeing 0 or 1.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-black text-gray-900 mb-3 uppercase text-xs tracking-wider">Longitude (Phase)</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Spinning the arrow around the equator changes its <span className="text-indigo-600 font-bold">Phase</span>. 
                This doesn't change the 50/50 odds, but it determines how the qubit interferes with others.
              </p>
            </div>
          </div>
        </div>

        {/* The Gates Library */}
        <div className="mb-24">
          <SectionHeader 
            icon={Compass}
            title="The Gates Library"
            subtitle="Quantum gates are simply rotations of the state vector."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GateExplainer 
              name="X"
              description="The 'NOT' gate. Flips the qubit state from top to bottom."
              geometric="180° rotation around the X-axis."
              matrix="X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}"
            />
            <GateExplainer 
              name="Y"
              description="A combined bit and phase flip. Flips the state and adds an imaginary phase."
              geometric="180° rotation around the Y-axis."
              matrix="Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}"
            />
            <GateExplainer 
              name="Z"
              description="The 'Phase' gate. Flips the phase without changing probabilities."
              geometric="180° rotation around the Z-axis."
              matrix="Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}"
            />
            <GateExplainer 
              name="H"
              description="The 'Superposition' gate. Creates a 50/50 state from 0 or 1."
              geometric="180° rotation around the diagonal X+Z axis."
              matrix="H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}"
            />
            <GateExplainer 
              name="S"
              description="A 'quarter-turn' of phase. Often called the Phase gate."
              geometric="90° rotation around the Z-axis."
              matrix="S = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}"
            />
            <GateExplainer 
              name="T"
              description="An 'eighth-turn' of phase. Critical for universal quantum computing."
              geometric="45° rotation around the Z-axis."
              matrix="T = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}"
            />
          </div>
        </div>

        {/* Pro Features Section */}
        <div className="mb-24">
          <SectionHeader 
            icon={Zap}
            title="Unique Features"
            subtitle="Why our simulator is different from the rest."
          />
          <div className="space-y-6">
            <div className="flex gap-8 items-center bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex-1">
                <h4 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Trajectory Trails</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Most simulators show the arrow "jumping" from one state to another. Ours shows the **Physical Pathway**. 
                  As a gate is applied, a glowing trail traces the exact curve the qubit travelled. 
                  This reveals the geometry behind the unitary transformation.
                </p>
              </div>
              <div className="hidden md:block w-48 h-48 bg-gray-50 rounded-full border-4 border-white shadow-inner flex items-center justify-center">
                 <div className="w-32 h-32 border-2 border-indigo-200 rounded-full border-dashed animate-spin-slow" />
              </div>
            </div>

            <div className="flex gap-8 items-center bg-indigo-600 p-10 rounded-[40px] text-white">
              <div className="flex-1">
                <h4 className="text-xl font-black mb-4 tracking-tight">Live Linear Algebra</h4>
                <p className="text-sm text-indigo-100 font-medium leading-relaxed opacity-90">
                  We don't hide the math. The "Step-by-Step Math" panel breaks down the matrix multiplication 
                  for every single interaction. You see the input vector, the gate matrix, and the complex calculation 
                  that leads to the final state.
                </p>
              </div>
              <div className="hidden md:flex p-6 bg-white/10 rounded-2xl border border-white/20 items-center justify-center">
                 <InlineMath math="\alpha|0\rangle + \beta|1\rangle" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact/Call to Action */}
        <div className="bg-gray-900 rounded-[50px] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Ready to start simulating?</h3>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
              Open Simulator <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
