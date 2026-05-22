import React, { useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import { useCircuitStore } from './store/useCircuitStore';

// Components
import BlochSphere from './components/sphere/BlochSphere';
import SphereAxes from './components/sphere/SphereAxes';
import StateArrow from './components/sphere/StateArrow';
import GhostArrow from './components/sphere/GhostArrow';
import PhosphorTrail from './components/sphere/PhosphorTrail';
import Sidebar from './components/layout/Sidebar';
import CircuitDisplay from './components/circuit/CircuitDisplay';

import { Github, Info, Cpu, RotateCcw, Undo2 } from 'lucide-react';
import AboutPage from './components/layout/AboutPage';

function App() {
  const [currentView, setCurrentView] = React.useState('about');
  const initialize = useCircuitStore((state) => state.initialize);
  const reset = useCircuitStore((state) => state.reset);
  const undo = useCircuitStore((state) => state.undo);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0e1322] text-[#dee1f7] overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="h-16 bg-transparent backdrop-blur-xl flex items-center justify-between px-8 z-20 border-b border-white/5">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setCurrentView('about')}
        >
          <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-all border border-cyan-500/30">
            <Cpu className="text-cyan-400" size={20} />
          </div>
          <h1 className="text-lg font-black text-white tracking-tighter uppercase">QUBIT_SIM</h1>
        </div>
        <div className="flex items-center gap-8 font-black uppercase tracking-[0.2em]">
          <button 
            onClick={() => setCurrentView('about')}
            className={`transition-all ${currentView === 'about' ? 'text-sm text-cyan-400' : 'text-xs text-gray-400 hover:text-white'}`}
          >
            ABOUT
          </button>
          <button 
            onClick={() => setCurrentView('simulator')}
            className={`transition-all ${currentView === 'simulator' ? 'text-sm text-cyan-400' : 'text-xs text-gray-400 hover:text-white'}`}
          >
            SIMULATOR
          </button>
          <a href="https://github.com/agneyabharale/Quantum_Simulator" target="_blank" rel="noopener noreferrer" id="header-github-link" className="text-gray-400 hover:text-white transition-all">
            <Github size={16} />
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {currentView === 'simulator' ? (
          <>
            {/* Main Area: 3D Visualization */}
            <main className="flex-1 relative p-6 flex flex-col gap-6 overflow-hidden bg-[#090e1c]">
              
              {/* Circuit Display Card */}
              <div className="card-dark p-6 border-cyan-500/10">
                <CircuitDisplay />
              </div>

              {/* 3D Sphere Card */}
              <div className="flex-1 card-dark relative overflow-hidden group border-white/5">
                {/* Simulator Controls Overlays */}
                <div className="absolute top-6 left-6 z-10 flex gap-3">
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-[#002021] rounded-lg shadow-lg hover:brightness-110 transition-all uppercase text-[10px] font-black tracking-widest"
                  >
                    <RotateCcw size={14} /> Initialize
                  </button>
                  <button 
                    onClick={undo}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1f2f] text-white border border-white/10 rounded-lg shadow-lg hover:bg-white/5 transition-all uppercase text-[10px] font-black tracking-widest"
                  >
                    <Undo2 size={14} /> Undo Last
                  </button>
                </div>

                <Canvas camera={{ position: [-2, 2, 4], fov: 45 }} className="cursor-move">
                  <color attach="background" args={['#090e1c']} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  
                  <Suspense fallback={null}>
                    <group scale={1.5}>
                      <BlochSphere />
                      <SphereAxes />
                      <StateArrow />
                      <GhostArrow />
                      <PhosphorTrail />
                    </group>
                    <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={10} blur={2.4} far={4.5} />
                    <Environment preset="night" />
                  </Suspense>

                  <OrbitControls 
                    enablePan={false} 
                    minDistance={3} 
                    maxDistance={8} 
                  />
                </Canvas>

                {/* Bottom Controls Overlay */}
                <div className="absolute bottom-6 left-6 z-10">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 transition-all uppercase text-[10px] font-black tracking-widest backdrop-blur-md">
                    Export State
                  </button>
                </div>
              </div>

              {/* Footer Branding */}
              <div className="flex justify-between items-center text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black px-2">
                <div className="flex gap-8">
                  <a href="https://github.com/agneyabharale/Quantum_Simulator" target="_blank" rel="noopener noreferrer" id="simulator-github-link" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Github size={12} /> git_repository
                  </a>
                  <span className="flex items-center gap-2 opacity-50"><Info size={12} /> engine_v1.2_stable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  Simulator Active
                </div>
              </div>
            </main>

            {/* Sidebar: Controls */}
            <aside className="w-[420px] bg-[#0e1322] border-l border-white/5 overflow-y-auto shadow-2xl z-10">
              <Sidebar />
            </aside>
          </>
        ) : (
          <AboutPage onLaunch={() => setCurrentView('simulator')} />
        )}
      </div>

    </div>
  );
}

export default App;
