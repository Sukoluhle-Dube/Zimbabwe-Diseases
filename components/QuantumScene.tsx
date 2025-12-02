/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Cylinder, Environment } from '@react-three/drei';
import * as THREE from 'three';

const BioParticle = ({ position, color, scale = 1, distortion = 0.4 }: { position: [number, number, number]; color: string; scale?: number, distortion?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Organic floating movement
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.3;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.8}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        roughness={0.4}
        metalness={0.1}
        distort={distortion}
        speed={1.5}
      />
    </Sphere>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.5} penumbra={1} color="#fff" />
        <pointLight position={[-10, -5, -5]} intensity={1} color="#BC4B51" />
        
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          {/* Main "Cell" or "Viral Target" */}
          <BioParticle position={[0, 0, 0]} color="#BC4B51" scale={1.8} distortion={0.6} />
          
          {/* Background particles */}
          <BioParticle position={[-4, 2, -5]} color="#E2E8F0" scale={0.8} distortion={0.3} />
          <BioParticle position={[4, -2, -2]} color="#BC4B51" scale={0.6} distortion={0.3} />
          <BioParticle position={[-3, -3, 2]} color="#E2E8F0" scale={0.4} distortion={0.2} />
          <BioParticle position={[3, 3, -4]} color="#E2E8F0" scale={0.5} distortion={0.3} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

const DNAHelix = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  const count = 20;
  const radius = 1.2;
  const height = 6;
  
  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => {
        const t = i / count;
        const angle = t * Math.PI * 4;
        const y = (t - 0.5) * height;
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = -x1;
        const z2 = -z1;

        return (
          <group key={i} position={[0, y, 0]}>
            {/* Strand 1 Node */}
            <Sphere args={[0.15, 16, 16]} position={[x1, 0, z1]}>
               <meshStandardMaterial color="#BC4B51" />
            </Sphere>
            {/* Strand 2 Node */}
            <Sphere args={[0.15, 16, 16]} position={[x2, 0, z2]}>
               <meshStandardMaterial color="#4A5568" />
            </Sphere>
            {/* Connection */}
            <Cylinder args={[0.04, 0.04, radius * 2, 8]} rotation={[0, -angle, Math.PI/2]}>
               <meshStandardMaterial color="#CBD5E0" transparent opacity={0.5} />
            </Cylinder>
          </group>
        );
      })}
    </group>
  );
};

export const QuantumComputerScene: React.FC = () => {
  // Renaming conceptual usage to Medical Research Scene (DNA)
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#fff" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
           <DNAHelix />
        </Float>
      </Canvas>
    </div>
  );
}