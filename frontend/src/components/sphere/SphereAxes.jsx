import React from 'react';
import { Text, Line } from '@react-three/drei';

const SphereAxes = () => {
  const axisSize = 1.25;
  const labelDist = 1.42;

  return (
    <group>
      {/* X Axis — Red, |+⟩ / |-⟩ */}
      <Line 
        points={[[-axisSize, 0, 0], [axisSize, 0, 0]]} 
        color="#ff4d6d" 
        lineWidth={1.2} 
        transparent 
        opacity={0.45} 
      />
      <Text position={[labelDist, 0.04, 0]} fontSize={0.14} color="#ff4d6d" fontWeight={900} opacity={0.95}>
        |+⟩
      </Text>
      <Text position={[-labelDist, 0.04, 0]} fontSize={0.14} color="#ff4d6d" fontWeight={900} opacity={0.55}>
        |-⟩
      </Text>

      {/* Y Axis — Green, |i⟩ / |-i⟩ */}
      <Line 
        points={[[0, 0, -axisSize], [0, 0, axisSize]]} 
        color="#4ade80" 
        lineWidth={1.2} 
        transparent 
        opacity={0.45} 
      />
      <Text position={[0, 0.04, labelDist]} fontSize={0.14} color="#4ade80" fontWeight={900} opacity={0.95}>
        |i⟩
      </Text>
      <Text position={[0, 0.04, -labelDist]} fontSize={0.14} color="#4ade80" fontWeight={900} opacity={0.55}>
        |-i⟩
      </Text>

      {/* Z Axis — Blue, |0⟩ / |1⟩ */}
      <Line 
        points={[[0, -axisSize, 0], [0, axisSize, 0]]} 
        color="#38bdf8" 
        lineWidth={1.2} 
        transparent 
        opacity={0.45} 
      />
      <Text position={[0, labelDist, 0]} fontSize={0.16} color="#ffffff" fontWeight={900} opacity={1.0}>
        |0⟩
      </Text>
      <Text position={[0, -labelDist, 0]} fontSize={0.16} color="#ffffff" fontWeight={900} opacity={1.0}>
        |1⟩
      </Text>
    </group>
  );
};

export default SphereAxes;
