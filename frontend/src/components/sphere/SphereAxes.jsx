import React from 'react';
import { Text, Line } from '@react-three/drei';

/**
 * Renders the X, Y, and Z axes for the Bloch Sphere.
 * Each axis has a distinct color for better orientation.
 */
const SphereAxes = () => {
  const axisSize = 1.2;
  const labelDist = 1.35;

  return (
    <group>
      {/* X Axis (Red-ish) */}
      <Line 
        points={[[-axisSize, 0, 0], [axisSize, 0, 0]]} 
        color="#ff4444" 
        lineWidth={1} 
        transparent 
        opacity={0.4} 
      />
      <Text position={[labelDist, 0, 0]} fontSize={0.1} color="#ff4444">X</Text>

      {/* Y Axis (Green-ish) */}
      <Line 
        points={[[0, 0, -axisSize], [0, 0, axisSize]]} 
        color="#44ff44" 
        lineWidth={1} 
        transparent 
        opacity={0.4} 
      />
      <Text position={[0, 0, labelDist]} fontSize={0.1} color="#44ff44">Y</Text>

      {/* Z Axis (Blue-ish) */}
      <Line 
        points={[[0, -axisSize, 0], [0, axisSize, 0]]} 
        color="#4444ff" 
        lineWidth={1} 
        transparent 
        opacity={0.4} 
      />
      <Text position={[0, labelDist, 0]} fontSize={0.1} color="#4444ff">|0⟩</Text>
      <Text position={[0, -labelDist, 0]} fontSize={0.1} color="#4444ff">|1⟩</Text>
    </group>
  );
};

export default SphereAxes;
