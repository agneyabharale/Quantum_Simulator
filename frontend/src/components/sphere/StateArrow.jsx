import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCircuitStore } from '../../store/useCircuitStore';

/**
 * The State Arrow represents the current qubit state |ψ⟩.
 * It animates smoothly between positions.
 */
const StateArrow = () => {
  const meshRef = useRef();
  const simulation = useCircuitStore((state) => state.simulation);
  const currentStep = useCircuitStore((state) => state.currentStep);

  // Determine the target state based on step mode
  const getTargetState = () => {
    if (!simulation) return { x: 0, y: 0, z: 1 }; // Default to |0>
    
    // If in step mode, use the history
    if (currentStep !== -1 && simulation.history && simulation.history[currentStep]) {
      return simulation.history[currentStep].bloch;
    }
    
    return simulation.bloch;
  };

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const target = getTargetState();
    
    // Target position mapping: Bloch (x, y, z) -> Three (x, z, -y)
    const targetVec = new THREE.Vector3(target.x, target.z, -target.y);
    
    // Smoothly interpolate the "look at" direction
    if (!meshRef.current.userData.currentLookAt) {
      meshRef.current.userData.currentLookAt = targetVec.clone();
    }
    meshRef.current.userData.currentLookAt.lerp(targetVec, 0.1);
    
    // Convert local target to world space for the lookAt call
    // This is CRITICAL because Three.js .lookAt() expects a WORLD space position.
    const worldTarget = meshRef.current.parent 
      ? meshRef.current.parent.localToWorld(meshRef.current.userData.currentLookAt.clone())
      : meshRef.current.userData.currentLookAt;

    meshRef.current.lookAt(worldTarget);
  });

  return (
    <group ref={meshRef}>
      {/* Arrow Shaft */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 1, 12]} />
        <meshStandardMaterial 
          color="#00f2ff" 
          emissive="#00f2ff" 
          emissiveIntensity={2} 
        />
      </mesh>
      
      {/* Arrow Head (Cone) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
        <coneGeometry args={[0.04, 0.12, 12]} />
        <meshStandardMaterial 
          color="#00f2ff" 
          emissive="#00f2ff" 
          emissiveIntensity={5} 
        />
      </mesh>
    </group>
  );
};

export default StateArrow;
