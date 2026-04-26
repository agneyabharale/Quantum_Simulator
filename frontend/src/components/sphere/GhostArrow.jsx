import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCircuitStore } from '../../store/useCircuitStore';

const GhostArrow = () => {
  const previewSimulation = useCircuitStore((state) => state.previewSimulation);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current || !previewSimulation) return;
    
    const { x, y, z } = previewSimulation.bloch;
    
    // Target position mapping (same as StateArrow)
    const targetVec = new THREE.Vector3(x, z, -y);
    
    // Smoothly interpolate the "look at" direction
    if (!meshRef.current.userData.currentLookAt) {
      meshRef.current.userData.currentLookAt = targetVec.clone();
    }
    meshRef.current.userData.currentLookAt.lerp(targetVec, 0.15);
    
    // Convert to world space
    const worldTarget = meshRef.current.parent 
      ? meshRef.current.parent.localToWorld(meshRef.current.userData.currentLookAt.clone())
      : meshRef.current.userData.currentLookAt;

    meshRef.current.lookAt(worldTarget);
  });

  if (!previewSimulation) return null;

  return (
    <group ref={meshRef}>
      {/* Arrow Shaft */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 1, 12]} />
        <meshStandardMaterial 
          color="#818cf8" 
          transparent 
          opacity={0.4} 
          emissive="#818cf8"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Arrow Head */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
        <coneGeometry args={[0.04, 0.1, 12]} />
        <meshStandardMaterial 
          color="#818cf8" 
          transparent 
          opacity={0.4} 
          emissive="#818cf8"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default GhostArrow;
