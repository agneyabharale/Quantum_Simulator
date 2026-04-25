import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCircuitStore } from '../../store/useCircuitStore';

/**
 * PhosphorTrail renders the "Glowing Arc" trajectory.
 * It takes the list of points from the backend and creates a smooth 3D curve.
 */
const PhosphorTrail = () => {
  const trajectory = useCircuitStore((state) => state.simulation?.trajectory);

  // Generate a curve from the trajectory points
  const curve = useMemo(() => {
    if (!trajectory || trajectory.length < 2) return null;
    
    const points = trajectory.map(p => new THREE.Vector3(p.x, p.z, -p.y));
    return new THREE.CatmullRomCurve3(points);
  }, [trajectory]);

  if (!curve) return null;

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.008, 8, false]} />
      <meshStandardMaterial 
        color="#ff00ff" 
        emissive="#ff00ff" 
        emissiveIntensity={2} 
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
};

export default PhosphorTrail;
