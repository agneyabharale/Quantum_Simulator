import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The main Bloch Sphere visual.
 * Uses a glass-like material with subtle distortions for a premium feel.
 */
const BlochSphere = () => {
  return (
    <group>
      {/* Outer Glass Sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshPhysicalMaterial
          transparent
          opacity={0.15}
          color="#88ccff"
          roughness={0.1}
          metalness={0.1}
          transmission={0.5}
          thickness={0.5}
          clearcoat={1}
        />
      </Sphere>

      {/* Subtle Wireframe for Gridlines */}
      <Sphere args={[1, 16, 16]}>
        <meshBasicMaterial
          wireframe
          color="#ffffff"
          transparent
          opacity={0.05}
        />
      </Sphere>

      {/* Equator Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.005, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default BlochSphere;
