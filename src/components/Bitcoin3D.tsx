import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import BitcoinModel from './BitcoinModel';
import Lighting from './Lighting';

interface Bitcoin3DProps {
  className?: string;
  size?: number;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
}

/**
 * Bitcoin3D Component
 * 
 * Renders a 3D Bitcoin model with:
 * - High-quality lighting setup
 * - Environment reflections for metallic surfaces
 * - Smooth orbit controls with auto-rotation
 * - Responsive canvas sizing
 */
const Bitcoin3D: React.FC<Bitcoin3DProps> = ({
  className = '',
  size = 0.2,
  autoRotate = true,
  enableZoom = true,
  enablePan = true
}) => {
  const calculatedScale = size * 0.15;
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={canvasRef} className={`${className}`} style={{ width: '100%', height: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{
          antialias: true,
          alpha: true,
          // Tone mapping for better color rendering of metallic surfaces
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        // Enable shadows for more depth
        shadows
      >
        {/* Enhanced lighting setup */}
        <Lighting />

        {/* Environment reflections for metallic materials */}
        {/* 'city' preset provides urban reflections that look great on gold/metal */}
        <Environment
          preset="city"
          environmentIntensity={0.5}
        />

        {/* The Bitcoin 3D Model */}
        <BitcoinModel scale={calculatedScale} />

        {/* Orbit controls for user interaction */}
        <OrbitControls
          enableZoom={enableZoom}
          enablePan={enablePan}
          autoRotate={autoRotate}
          autoRotateSpeed={0.4}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={8}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

export default Bitcoin3D;