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

import { Github, Cpu, RotateCcw, Undo2 } from 'lucide-react';
import AboutPage from './components/layout/AboutPage';

function App() {
  const [currentView, setCurrentView] = React.useState('about');
  const initialize = useCircuitStore((state) => state.initialize);
  const reset = useCircuitStore((state) => state.reset);
  const undo = useCircuitStore((state) => state.undo);

  const initialDpr = React.useRef(window.devicePixelRatio || 1);
  const [zoomScale, setZoomScale] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      const currentDpr = window.devicePixelRatio || 1;
      setZoomScale(initialDpr.current / currentDpr);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className={`flex flex-col h-screen w-screen text-[#dee1f7] overflow-hidden relative selection:bg-cyan-500/30 transition-colors duration-300 ${currentView === 'simulator' ? 'bg-[#000000]' : 'bg-[#0e1322]'}`}>
      
      {/* Header */}
      <header className="h-16 bg-transparent flex items-center justify-between px-8 z-20">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setCurrentView('about')}
        >
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all border border-white/10">
            <Cpu className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-black text-white tracking-tighter uppercase">QUBIT_SIM</h1>
        </div>
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
          <button 
            onClick={() => setCurrentView('about')}
            className={`transition-all pb-1 border-b-2 text-white ${currentView === 'about' ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            ABOUT
          </button>
          <button 
            onClick={() => setCurrentView('simulator')}
            className={`transition-all pb-1 border-b-2 text-white ${currentView === 'simulator' ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            SIMULATOR
          </button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#a855f7] hover:text-[#c084fc] transition-all">
            <Github size={16} />
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {currentView === 'simulator' ? (
          <>
            {/* Main Area: 3D Visualization */}
            <main 
              style={{
                paddingBottom: `${12 * zoomScale}px`,
                paddingLeft: `${24 * zoomScale}px`,
                paddingRight: `${24 * zoomScale}px`,
              }}
              className="flex-1 relative flex flex-col overflow-x-visible overflow-y-hidden bg-[#000000]"
            >
              {/* 3D Canvas Background — shifted up to fill dead space and center sphere */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-64px',
                  left: '-420px',
                  width: 'calc(100% + 840px)',
                  height: 'calc(100% + 64px)',
                  zIndex: 0,
                }}
              >
                <Canvas camera={{ position: [-2, 0.5, 4], fov: 45 }} className="cursor-move">
                  <color attach="background" args={['#000000']} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  
                  <Suspense fallback={null}>
                    <group scale={1.5 * zoomScale}>
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
              </div>

              {/* 3 buttons — vertical column, solid cyan bg + white text */}
              <div className="absolute top-4 left-6 z-20 flex flex-col gap-2 pointer-events-auto">
                <button 
                  onClick={reset}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-lg shadow-lg hover:bg-cyan-400 transition-colors uppercase text-[10px] font-black tracking-widest"
                >
                  <RotateCcw size={14} /> Initialize
                </button>
                <button 
                  onClick={undo}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-lg shadow-lg hover:bg-cyan-400 transition-colors uppercase text-[10px] font-black tracking-widest"
                >
                  <Undo2 size={14} /> Undo Last
                </button>
                <button 
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-lg shadow-lg hover:bg-cyan-400 transition-colors uppercase text-[10px] font-black tracking-widest"
                >
                  Export State
                </button>
              </div>

              {/* Stack card — slim, no vertical waste */}
              <div className="mt-auto relative z-10"
                style={{
                  paddingBottom: `${12 * zoomScale}px`,
                  paddingLeft: `${24 * zoomScale}px`,
                  paddingRight: `${24 * zoomScale}px`,
                }}
              >
                <div className="border border-white/10 bg-transparent rounded-xl px-6 py-2">
                  <CircuitDisplay zoomScale={zoomScale} />
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
