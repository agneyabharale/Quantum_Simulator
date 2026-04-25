import React from 'react';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const BlochSphere = () => {
  // Generate meridian lines (circles around the Z axis)
  const meridians = [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4];
  
  return (
    <group>
      {/* The main faint sphere outline - SIGNIFICANTLY MORE VISIBLE */}
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial
          transparent
          opacity={0.1}
          color="#000000"
          wireframe
        />
      </Sphere>

      {/* A very subtle solid sphere for "volume" feel */}
      <Sphere args={[0.99, 32, 32]}>
        <meshBasicMaterial
          transparent
          opacity={0.03}
          color="#f0f0f0"
        />
      </Sphere>

      {/* Equator Circle */}
      <Line
        points={new THREE.EllipseCurve(0, 0, 1, 1, 0, 2 * Math.PI, false, 0).getPoints(100).map(p => [p.x, 0, p.y])}
        color="#333333"
        lineWidth={1.5}
        transparent
        opacity={0.3}
      />

      {/* Longitudinal Circles (Meridians) */}
      {meridians.map((angle, i) => (
        <Line
          key={i}
          points={new THREE.EllipseCurve(0, 0, 1, 1, 0, 2 * Math.PI, false, 0).getPoints(100).map(p => [
            p.x * Math.cos(angle),
            p.y,
            p.x * Math.sin(angle)
          ])}
          color="#333333"
          lineWidth={0.8}
          transparent
          opacity={0.15}
        />
      ))}

      {/* Highlighted X-Z and Y-Z planes */}
      <Line
        points={new THREE.EllipseCurve(0, 0, 1, 1, 0, 2 * Math.PI, false, 0).getPoints(100).map(p => [p.x, p.y, 0])}
        color="#000000"
        lineWidth={2}
        transparent
        opacity={0.4}
      />
      <Line
        points={new THREE.EllipseCurve(0, 0, 1, 1, 0, 2 * Math.PI, false, 0).getPoints(100).map(p => [0, p.y, p.x])}
        color="#000000"
        lineWidth={2}
        transparent
        opacity={0.4}
      />
    </group>
  );
};

export default BlochSphere;
