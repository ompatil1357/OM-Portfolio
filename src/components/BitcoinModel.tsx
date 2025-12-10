import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BitcoinModelProps {
  scale?: number;
}

function BitcoinModel({ scale = 1 }: BitcoinModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load the GLB model from public folder
  const { scene } = useGLTF('/bitcoin.glb');

  // Center the model and fix materials
  useEffect(() => {
    // Calculate bounding box to center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    
    // Offset the scene to center it
    scene.position.x = -center.x;
    scene.position.y = -center.y;
    scene.position.z = -center.z;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Ensure materials are properly configured
        if (child.material) {
          // Make material double-sided
          child.material.side = THREE.DoubleSide;
          
          // Enhance material properties for better shine
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.metalness = 0.9;
            child.material.roughness = 0.1;
            child.material.envMapIntensity = 1.5;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [scene]);

  // Auto rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group 
      ref={meshRef} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, -0.5, 0]} // Positioned slightly lower
    >
      <primitive 
        object={scene} 
        scale={hovered ? 1.05 : 1}
      />
    </group>
  );
}

export default BitcoinModel;