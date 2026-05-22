import React from 'react';
import { Text, Line } from '@react-three/drei';

const SphereAxes = () => {
  const axisSize = 1.2;
  const labelDist = 1.35;

  return (
    <group>
      {/* X Axis */}
      <Line 
        points={[[-axisSize, 0, 0], [axisSize, 0, 0]]} 
        color="#ffffff" 
        lineWidth={1} 
        transparent 
        opacity={0.3} 
      />
      <Text position={[labelDist, 0, 0]} fontSize={0.12} color="#ffffff" fontStyle="black">|+⟩</Text>
      <Text position={[-labelDist, 0, 0]} fontSize={0.12} color="#ffffff" fontStyle="black">|-⟩</Text>

      {/* Y Axis */}
      <Line 
        points={[[0, 0, -axisSize], [0, 0, axisSize]]} 
        color="#ffffff" 
        lineWidth={1} 
        transparent 
        opacity={0.3} 
      />
      <Text position={[0, 0, -labelDist]} fontSize={0.12} color="#ffffff" fontStyle="black">|i⟩</Text>
      <Text position={[0, 0, labelDist]} fontSize={0.12} color="#ffffff" fontStyle="black">|-i⟩</Text>

      {/* Z Axis */}
      <Line 
        points={[[0, -axisSize, 0], [0, axisSize, 0]]} 
        color="#ffffff" 
        lineWidth={1} 
        transparent 
        opacity={0.3} 
      />
      <Text position={[0, labelDist, 0]} fontSize={0.12} color="#ffffff" fontStyle="black">|0⟩</Text>
      <Text position={[0, -labelDist, 0]} fontSize={0.12} color="#ffffff" fontStyle="black">|1⟩</Text>
    </group>
  );
};

export default SphereAxes;
