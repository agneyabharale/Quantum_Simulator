import React from 'react';
import { 
  RotateCw, 
  Zap, 
  BookOpen, 
  Cpu, 
  Github, 
  ArrowRight,
  Layers,
  Activity,
  Sigma,
  Sliders,
  GitBranch,
  Mail,
  Phone,
  User,
  Compass,
  Eye,
  FlipHorizontal,
  Orbit,
  BrainCircuit,
  ChevronRight
} from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import QuantumBackground from './QuantumBackground';

const GITHUB_URL = 'https://github.com/agneyabharale/Quantum_Simulator';

const AboutPage = ({ onLaunch }) => {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0e1322] text-[#dee1f7] font-body-md selection:bg-cyan-500/30 antialiased relative scroll-smooth">
      <QuantumBackground />
      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 220, 229, 0.15) 1px, transparent 0)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10">
        {/* ── Hero Section ── */}
        <section className="min-h-[90vh] flex items-center px-8 md:px-24 overflow-hidden">
          <div className="max-w-5xl py-20">
            <div className="inline-block px-4 py-1 border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
              Open-Source · Student Research Project · Built from Scratch
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95]">
              Quantum Mechanics<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Made Visible.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-medium">
              A real-time, browser-based single-qubit simulator with an interactive 3D Bloch Sphere, 
              live matrix algebra, animated gate step-through, and a glowing trajectory trail — 
              bridging the gap between quantum math and intuition.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                id="launch-simulator-btn"
                onClick={onLaunch}
                className="bg-cyan-400 text-[#002021] px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(0,245,255,0.3)]">
                Launch Simulator <ArrowRight size={16} />
              </button>
              <button 
                id="collaborate-btn"
                onClick={scrollToContact}
                className="border border-white/20 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-3">
                Click to Collaborate <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-8 pb-32">

          {/* ── What's Actually Inside ── */}
          <section className="mb-40">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl font-black mb-6 tracking-tight text-white uppercase">What's Inside</h2>
                <p className="text-gray-400 text-lg font-medium">Every feature you see below is live in the simulator — no placeholders, no mock-ups.</p>
              </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1a1f2f]/40 backdrop-blur-xl p-10 border border-white/5 group hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-1 bg-cyan-400 mb-8 group-hover:w-24 transition-all duration-500"></div>
                <Orbit className="text-cyan-400 mb-6" size={32} />
                <h3 className="text-xl font-black text-white mb-4 uppercase">3D Bloch Sphere</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Interactive React Three Fiber canvas with full orbit controls, labeled axes (|0⟩, |1⟩, |+⟩, |−⟩, |i⟩, |−i⟩), and a glowing state-vector arrow that animates via SLERP on every gate.</p>
              </div>
              <div className="bg-[#1a1f2f]/40 backdrop-blur-xl p-10 border border-white/5 group hover:border-purple-500/30 transition-all">
                <div className="w-12 h-1 bg-purple-400 mb-8 group-hover:w-24 transition-all duration-500"></div>
                <Sigma className="text-purple-400 mb-6" size={32} />
                <h3 className="text-xl font-black text-white mb-4 uppercase">Live Matrix Algebra</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Every gate click renders its 2×2 matrix, the current state vector [α, β], and the output in KaTeX notation. Full step-by-step math breakdown for every transformation.</p>
              </div>
              <div className="bg-[#1a1f2f]/40 backdrop-blur-xl p-10 border border-white/5 group hover:border-yellow-500/30 transition-all">
                <div className="w-12 h-1 bg-yellow-400 mb-8 group-hover:w-24 transition-all duration-500"></div>
                <Activity className="text-yellow-400 mb-6" size={32} />
                <h3 className="text-xl font-black text-white mb-4 uppercase">Trajectory Trail</h3>
                <p className="text-sm text-gray-400 leading-relaxed">A glowing CatmullRom arc traces the exact path the state vector travels across the sphere surface, fading from bright (latest) to dim (earliest) — a full visual history of the circuit.</p>
              </div>
            </div>
          </section>

          {/* ── Bloch Sphere Deep Dive ── */}
          <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>

              <h2 className="text-5xl font-black mb-8 text-white tracking-tight leading-tight">
                Quantum States<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Made Tangible.</span>
              </h2>
              <div className="space-y-10">
                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    Computational Basis Poles
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-cyan-500/50 transition-colors">
                    The <span className="text-cyan-400">North Pole</span> is |0⟩ and the <span className="text-cyan-400">South Pole</span> is |1⟩. Any superposition lies somewhere on the sphere surface. Drag and orbit the 3D sphere to see your qubit's state from any angle.
                  </p>
                </div>
                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Ghost Arrow Preview
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-purple-500/50 transition-colors">
                    Hover any gate in the panel and a semi-transparent ghost arrow instantly previews where the state would move — before you commit. No other free tool does this.
                  </p>
                </div>
                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    SLERP-Animated Transitions
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-yellow-500/50 transition-colors">
                    Applying a gate doesn't teleport the arrow — it smoothly interpolates along the spherical geodesic path using Spherical Linear Interpolation (SLERP), showing the true rotational nature of quantum gates.
                  </p>
                </div>
                <div className="group">
                  <h4 className="font-black text-white uppercase mb-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Phosphor Trail
                  </h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed pl-4 border-l border-white/5 group-hover:border-white/50 transition-colors">
                    A glowing arc built from CatmullRom curves records every gate's geometric impact. The trail fades chronologically — newest steps glow bright, older ones dim — revealing the full computational history at a glance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-10 bg-cyan-500/10 blur-[100px] rounded-full opacity-50 animate-pulse"></div>
              <div className="bg-[#1a1f2f]/60 backdrop-blur-2xl p-1 rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10">
                <div className="bg-[#090e1c] p-8 rounded-xl">
                  <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-1">Live State Analysis</span>
                      <span className="text-sm font-bold text-gray-500">Real-time Qubit Telemetry</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                      <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                        <span className="text-cyan-400">P(|0⟩) — Probability</span>
                        <span className="text-white">85.4%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 shadow-[0_0_10px_#00f5ff]" style={{ width: '85.4%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                        <span className="text-purple-400">P(|1⟩) — Probability</span>
                        <span className="text-white">14.6%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 shadow-[0_0_10px_#ecb1ff]" style={{ width: '14.6%' }}></div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">α (|0⟩ amplitude)</div>
                        <div className="text-cyan-400 font-black text-base font-mono">0.924 + 0i</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">β (|1⟩ amplitude)</div>
                        <div className="text-purple-400 font-black text-base font-mono">0.382 + 0i</div>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center justify-center">
                      <div className="text-purple-300 font-mono text-base py-2 tracking-wide">
                        |ψ⟩ = α|0⟩ + β|1⟩
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Gate Library ── */}
          <section className="mb-40">
            <div className="mb-16">
              <h2 className="text-4xl font-black mb-6 tracking-tight text-white uppercase">The Quantum Gate Engine</h2>
              <p className="text-gray-400 text-lg font-medium">7 standard gates · 6 fixed rotations · Arbitrary custom rotations — all computed with NumPy precision on a FastAPI backend.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GateExplainer name="H" color="cyan" description="The superposition gate. Maps |0⟩ to (|0⟩+|1⟩)/√2 and |1⟩ to (|0⟩−|1⟩)/√2." geometric="180° rotation around the X+Z diagonal axis." matrix="H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}" />
              <GateExplainer name="X" color="purple" description="Quantum NOT gate. Flips the qubit state completely. The quantum analog of a classical bit flip." geometric="180° rotation around the X-axis." matrix="X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}" />
              <GateExplainer name="Y" color="yellow" description="Combines a bit flip with a phase flip. Essential for constructing arbitrary rotations." geometric="180° rotation around the Y-axis." matrix="Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}" />
              <GateExplainer name="Z" color="white" description="Phase flip gate. Leaves |0⟩ unchanged and maps |1⟩ to −|1⟩. Changes relative phase." geometric="180° rotation around the Z-axis." matrix="Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}" />
              <GateExplainer name="S" color="cyan" description="Phase gate. Adds a 90° phase shift to the |1⟩ component only." geometric="90° rotation around the Z-axis." matrix="S = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}" />
              <GateExplainer name="T" color="purple" description="Critical T-gate. A 45° phase shift — the building block of fault-tolerant universal quantum computing." geometric="45° rotation around the Z-axis." matrix="T = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}" />
            </div>

            {/* Rotations Sub-Section */}
            <div className="mt-12 bg-[#1a1f2f]/40 backdrop-blur-xl border border-white/5 p-10 rounded-2xl">
              <h3 className="text-lg font-black text-white uppercase mb-2 tracking-tight">Fixed &amp; Custom Rotations</h3>
              <p className="text-sm text-gray-400 mb-8">Pre-built Rx, Ry, Rz at π/2 and π shortcuts, plus a custom angle input for arbitrary rotations. Enter any θ in radians and watch the Bloch sphere respond in real-time.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[['Rx(π/2)', 'cyan'], ['Rx(π)', 'cyan'], ['Ry(π/2)', 'purple'], ['Ry(π)', 'purple'], ['Rz(π/2)', 'yellow'], ['Rz(π)', 'yellow']].map(([label, color]) => (
                  <div key={label} className={`bg-black/20 border border-${color}-500/20 p-4 rounded-lg flex items-center gap-3`}>
                    <div className={`w-2 h-2 rounded-full bg-${color}-400`}></div>
                    <span className="text-sm font-black text-white font-mono">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
                <Sliders size={16} className="text-cyan-400 flex-shrink-0" />
                <span>Custom: enter any angle θ → apply as <InlineMath math="R_x(\theta)" />, <InlineMath math="R_y(\theta)" />, or <InlineMath math="R_z(\theta)" /></span>
              </div>
            </div>
          </section>

          {/* ── Core Differentiators ── */}
          <section className="mb-40">
            <div className="mb-16">
              <h2 className="text-4xl font-black mb-6 tracking-tight text-white uppercase">Features No Other Free Tool Ships Together</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                color="cyan"
                icon={<Eye size={24} className="text-cyan-400" />}
                title="Ghost Arrow Preview"
                description="Hover any gate button and a semi-transparent preview arrow instantly appears on the Bloch sphere showing where your state would land — before you even click. Real-time lookahead with zero computation lag."
              />
              <FeatureCard
                color="purple"
                icon={<BookOpen size={24} className="text-purple-400" />}
                title="Step-by-Step Math Breakdown"
                description="Every applied gate renders a full KaTeX-typeset derivation: the gate matrix, the pre-gate state, the matrix multiplication, and the resulting state vector — annotated and readable."
              />
              <FeatureCard
                color="yellow"
                icon={<GitBranch size={24} className="text-yellow-400" />}
                title="Animated Step-Through Mode"
                description="Apply gates one-by-one with the Step button. The Bloch sphere arrow animates via SLERP to each new position, and the phosphor trail records every step. Undo any gate at any time."
              />
              <FeatureCard
                color="white"
                icon={<Layers size={24} className="text-white" />}
                title="Circuit Timeline Display"
                description="A visual timeline renders your full circuit as you build it — each gate shown as a labeled chip. The current step is highlighted, with the full history always visible."
              />
              <FeatureCard
                color="cyan"
                icon={<Activity size={24} className="text-cyan-400" />}
                title="Live Probability Bars + Phase Disks"
                description="Real-time animated probability bars for |0⟩ and |1⟩ — plus phase disk dials for α and β amplitudes, updating live as you apply every gate."
              />
              <FeatureCard
                color="purple"
                icon={<BrainCircuit size={24} className="text-purple-400" />}
                title="FastAPI Python Backend"
                description="All quantum math (state evolution, probability calculation, Bloch coordinate conversion) runs on a NumPy-powered FastAPI backend — not approximations, but exact complex linear algebra."
              />
            </div>
          </section>

          {/* ── Tech Stack ── */}
          <section className="mb-40">
            <div className="mb-16">
              <h2 className="text-4xl font-black mb-6 tracking-tight text-white uppercase">Built With</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'React + Vite', sub: 'Frontend Framework', color: 'cyan' },
                { label: 'React Three Fiber', sub: '3D Bloch Sphere', color: 'purple' },
                { label: 'Three.js', sub: '3D Engine', color: 'yellow' },
                { label: 'FastAPI', sub: 'Python Backend', color: 'white' },
                { label: 'NumPy', sub: 'Quantum Math', color: 'cyan' },
                { label: 'KaTeX', sub: 'Math Rendering', color: 'purple' },
                { label: 'Zustand', sub: 'State Management', color: 'yellow' },
                { label: 'Tailwind CSS', sub: 'Styling', color: 'white' },
              ].map(({ label, sub, color }) => (
                <div key={label} className={`bg-[#1a1f2f]/40 border border-${color === 'white' ? 'white' : color + '-500'}/10 p-6 rounded-xl hover:border-${color === 'white' ? 'white' : color + '-500'}/30 transition-all group`}>
                  <div className={`text-${color === 'white' ? 'white' : color + '-400'} font-black text-base mb-1`}>{label}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">{sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Contact / Collaborate ── */}
          <section id="contact-section" className="mb-20">
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-16 rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="relative z-10 max-w-3xl mx-auto text-center">

                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                  Interested in<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Collaborating?</span>
                </h2>
                <p className="text-gray-400 mb-12 max-w-xl mx-auto font-medium text-lg leading-relaxed">
                  I'm a student developer passionate about quantum computing, interactive visualizations, 
                  and making complex physics accessible. Let's build something together.
                </p>


                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    id="launch-from-cta-btn"
                    onClick={onLaunch}
                    className="bg-cyan-400 text-[#002021] px-12 py-5 font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3">
                    Launch Simulator <ArrowRight size={16} />
                  </button>
                  <a 
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="meet-architect-btn"
                    className="border border-white/40 text-white px-12 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-3">
                    <Github size={16} /> Meet the Architect
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 bg-[#090e1c]/80 backdrop-blur-xl py-12 px-8 md:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                    <Cpu className="text-cyan-400" size={16} />
                  </div>
                  <span className="text-base font-black text-white tracking-tighter uppercase">QUBIT_SIM</span>
                </div>
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                  An open-source quantum computing simulator built by a student, for everyone.
                </p>
              </div>

              {/* Contact Details */}
              <div className="flex flex-col gap-3">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Contact</div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <User size={13} className="text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-white">Agneya Bharale</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail size={13} className="text-purple-400 flex-shrink-0" />
                  <a href="mailto:agneya.bharale25@pccoepune.org" className="hover:text-purple-300 transition-colors">
                    agneya.bharale25@pccoepune.org
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone size={13} className="text-yellow-400 flex-shrink-0" />
                  <a href="tel:+918623889424" className="hover:text-yellow-300 transition-colors">
                    +91 86238 89424
                  </a>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4">
                <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Links</div>
                <a 
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-github-link"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors font-bold">
                  <Github size={14} className="text-cyan-400" />
                  GitHub Repository
                </a>
                <button
                  onClick={onLaunch}
                  id="footer-launch-btn"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors font-bold text-left">
                  <Cpu size={14} className="text-cyan-400" />
                  Open Simulator
                </button>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-600 font-black uppercase tracking-widest">
              <span>© 2026 Agneya Bharale · PCCOE Pune · Mini Project</span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
                Open Source · MIT License
              </span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

const GateExplainer = ({ name, color = 'cyan', description, geometric, matrix }) => {
  const colorMap = {
    cyan: 'bg-cyan-400 text-[#002021]',
    purple: 'bg-purple-400 text-[#002021]',
    yellow: 'bg-yellow-400 text-[#002021]',
    white: 'bg-white text-[#002021]',
  };
  return (
    <div className="bg-[#1a1f2f]/40 p-8 border border-white/5 hover:border-cyan-500/30 transition-all group backdrop-blur-xl">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 ${colorMap[color] || colorMap.cyan} flex items-center justify-center font-black text-lg`}>{name}</div>
        <div className="text-xs font-black text-gray-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
          Gate
        </div>
      </div>
      <p className="text-base text-gray-400 font-medium leading-relaxed mb-6">{description}</p>
      <div className="bg-black/20 p-4 mb-4 border border-white/5">
        <div className="text-xs font-black text-gray-600 uppercase mb-2 tracking-widest">Bloch Sphere Effect</div>
        <div className="text-cyan-100 font-bold text-sm italic opacity-80">{geometric}</div>
      </div>
      <div className="text-base opacity-70 origin-left">
        <InlineMath math={matrix} />
      </div>
    </div>
  );
};

const FeatureCard = ({ color, icon, title, description }) => {
  const borderMap = {
    cyan: 'hover:border-cyan-500/30',
    purple: 'hover:border-purple-500/30',
    yellow: 'hover:border-yellow-500/30',
    white: 'hover:border-white/30',
  };
  return (
    <div className={`bg-[#1a1f2f]/40 p-12 border border-white/5 ${borderMap[color] || borderMap.cyan} transition-all group`}>
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-gray-400 font-medium leading-relaxed">{description}</p>
    </div>
  );
};

export default AboutPage;
