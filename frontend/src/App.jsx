import React, { useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import { useCircuitStore } from './store/useCircuitStore';

// Components
import BlochSphere from './components/sphere/BlochSphere';
import SphereAxes from './components/sphere/SphereAxes';
import StateArrow from './components/sphere/StateArrow';
import PhosphorTrail from './components/sphere/PhosphorTrail';
import Sidebar from './components/layout/Sidebar';
import CircuitDisplay from './components/circuit/CircuitDisplay';

// Icons
import { Github, Info, Cpu, RotateCcw, Undo2 } from 'lucide-react';

function App() {
  const initialize = useCircuitStore((state) => state.initialize);
  const reset = useCircuitStore((state) => state.reset);
  const undo = useCircuitStore((state) => state.undo);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f5f5f5] text-[#333] overflow-hidden">
      
      {/* Header */}
      <header className="h-14 bg-[#3f51b5] flex items-center justify-between px-6 shadow-md z-20">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/10 rounded-lg">
            <Cpu className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">Bloch sphere simulator</h1>
        </div>
        <div className="flex items-center gap-4 text-white/80 text-xs font-medium">
          <a href="#" className="hover:text-white transition-colors">HELP</a>
          <a href="#" className="hover:text-white transition-colors">ABOUT</a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Area: 3D Visualization */}
        <main className="flex-1 relative p-6 flex flex-col gap-6 overflow-hidden">
          
          {/* Circuit Display Card */}
          <div className="card-bright p-4">
            <CircuitDisplay />
          </div>

          {/* 3D Sphere Card */}
          <div className="flex-1 card-bright relative overflow-hidden group">
            {/* Simulator Controls Overlays */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <button 
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 bg-[#26a69a] text-white rounded shadow-md hover:bg-[#2bbbad] transition-all uppercase text-xs font-bold"
              >
                <RotateCcw size={14} /> Init
              </button>
              <button 
                onClick={undo}
                className="flex items-center gap-2 px-4 py-2 bg-[#26a69a] text-white rounded shadow-md hover:bg-[#2bbbad] transition-all uppercase text-xs font-bold"
              >
                <Undo2 size={14} /> Undo
              </button>
            </div>

            <Canvas camera={{ position: [-2, 2, 4], fov: 45 }} className="cursor-move">
              <color attach="background" args={['#ffffff']} />
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              
              <Suspense fallback={null}>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                  <group scale={1.5}>
                    <BlochSphere />
                    <SphereAxes />
                    <StateArrow />
                    <PhosphorTrail />
                  </group>
                </Float>
                <ContactShadows position={[0, -2, 0]} opacity={0.1} scale={10} blur={2.4} far={4.5} />
                <Environment preset="city" />
              </Suspense>

              <OrbitControls 
                enablePan={false} 
                minDistance={3} 
                maxDistance={8} 
              />
            </Canvas>

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-4 left-4 z-10">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#26a69a] text-white rounded shadow-md hover:bg-[#2bbbad] transition-all uppercase text-xs font-bold">
                Download
              </button>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#3f51b5] transition-colors flex items-center gap-1">
                <Github size={10} /> source
              </a>
              <span className="flex items-center gap-1"><Info size={10} /> built with r3f + fastapi</span>
            </div>
            <span>v1.2.0</span>
          </div>
        </main>

        {/* Sidebar: Controls */}
        <aside className="w-[380px] bg-white border-l border-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>
      </div>

    </div>
  );
}

export default App;
