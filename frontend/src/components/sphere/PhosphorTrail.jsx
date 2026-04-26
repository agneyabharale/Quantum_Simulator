import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCircuitStore } from '../../store/useCircuitStore';

/**
 * PhosphorTrail renders the "Glowing Arc" trajectory history.
 * It shows the path the state vector travelled for every gate in the circuit.
 */
const PhosphorTrail = () => {
  const simulation = useCircuitStore((state) => state.simulation);
  const currentStep = useCircuitStore((state) => state.currentStep);

  // Generate curves for all historical steps
  const trails = useMemo(() => {
    if (!simulation?.history) return [];
    
    // In step mode, we only show trails up to the current step
    const visibleSteps = currentStep === -1 
      ? simulation.history 
      : simulation.history.slice(0, currentStep + 1);

    return visibleSteps.map((step, idx) => {
      if (!step.trajectory || step.trajectory.length < 2) return null;
      
      const points = step.trajectory.map(p => new THREE.Vector3(p.x, p.z, -p.y));
      const curve = new THREE.CatmullRomCurve3(points);
      
      // Calculate fading: most recent is brightest
      const isLatest = idx === visibleSteps.length - 1;
      const opacity = isLatest ? 0.9 : Math.max(0.1, (idx + 1) / visibleSteps.length * 0.5);
      
      return {
        key: `trail-${idx}`,
        curve,
        opacity,
        // Latest step is hot pink, history is cool indigo
        color: isLatest ? "#ff00ff" : "#818cf8",
        thickness: isLatest ? 0.015 : 0.008 // Increased thickness
      };
    }).filter(Boolean);
  }, [simulation, currentStep]);

  return (
    <group>
      {trails.map((trail) => (
        <mesh key={trail.key}>
          <tubeGeometry args={[trail.curve, 64, trail.thickness, 8, false]} />
          <meshStandardMaterial 
            color={trail.color} 
            emissive={trail.color} 
            emissiveIntensity={trail.opacity * 5} // Increased emissive
            transparent 
            opacity={trail.opacity}
          />
        </mesh>
      ))}
    </group>
  );
};

export default PhosphorTrail;
