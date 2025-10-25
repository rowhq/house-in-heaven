'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Property } from '@/types';

interface Property3DViewerProps {
  property: Property;
}

function HeavenlyBuilding({ lotType = 'standard' }: { lotType?: string }) {
  // Building dimensions based on lot type
  const getBuildingConfig = () => {
    switch (lotType) {
      case 'studio':
        return { width: 1, height: 1.5, depth: 1, color: '#93c5fd' };
      case 'standard':
        return { width: 1.5, height: 2, depth: 1.5, color: '#86efac' };
      case 'premium':
        return { width: 2, height: 2.5, depth: 2, color: '#fbbf24' };
      case 'estate':
        return { width: 2.5, height: 3, depth: 2.5, color: '#f472b6' };
      case 'mansion':
        return { width: 3, height: 3.5, depth: 3, color: '#a78bfa' };
      default:
        return { width: 1.5, height: 2, depth: 1.5, color: '#86efac' };
    }
  };

  const config = getBuildingConfig();

  return (
    <group>
      {/* Main Building */}
      <mesh position={[0, config.height / 2, 0]} castShadow>
        <boxGeometry args={[config.width, config.height, config.depth]} />
        <meshStandardMaterial
          color={config.color}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, config.height + 0.3, 0]} castShadow>
        <coneGeometry args={[config.width * 0.8, 0.6, 4]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Foundation/Platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[config.width + 0.5, 0.2, config.depth + 0.5]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>

      {/* Decorative clouds around the building */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * Math.PI * 0.66) * (config.width + 1),
          config.height * 0.5 + i * 0.5,
          Math.cos(i * Math.PI * 0.66) * (config.depth + 1)
        ]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Golden glow at the base */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={0.5}
        color="#fbbf24"
        distance={5}
      />
    </group>
  );
}

export default function Property3DViewer({ property }: Property3DViewerProps) {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-sky-200 to-purple-200 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#60a5fa" />

        {/* The Property Building */}
        <HeavenlyBuilding lotType={property.lotType} />

        {/* Stars */}
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>

      {/* Overlay Info */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <div className="text-xs text-gray-600">Lot Type</div>
        <div className="text-sm font-semibold text-gray-900 capitalize">
          {property.lotType || 'Standard'}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  );
}
