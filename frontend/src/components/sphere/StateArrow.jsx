import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { useCircuitStore } from '../../store/useCircuitStore';

/**
 * The State Arrow represents the current qubit state |ψ⟩.
 * It animates smoothly between positions using SLERP.
 */
const StateArrow = () => {
  const meshRef = useRef();
  const bloch = useCircuitStore((state) => state.simulation?.bloch);
  
  // Target position from simulation
  const targetPos = useMemo(() => {
    if (!bloch) return new THREE.Vector3(0, 1, 0); // Default to |0⟩
    // Note: In Three.js, Y is typically Up, but Bloch sphere uses Z as Up (|0⟩).
    // We map backend (x,y,z) to Three.js (x,z,y) to align with standard Bloch visuals.
    return new THREE.Vector3(bloch.x, bloch.z, -bloch.y);
  }, [bloch]);

  // Smoothed position for the arrow head
  const currentPos = useRef(new THREE.Vector3(0, 1, 0));

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smoothly interpolate current orientation to target orientation
      // We use a simple lerp for the vector here, but for pure rotation 
      // one could use quaternions if the length were constant.
      currentPos.current.lerp(targetPos, 0.1);
      
      // Update lookAt to point from origin to target
      meshRef.current.lookAt(currentPos.current);
    }
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
