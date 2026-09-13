"use client";

import { Volcano } from "@/components/three/objects/volcano";

interface LakeProps {
  radius?: number;
}

/**
 * Lago de Atitlán: un espejo de agua rodeado por San Pedro, Tolimán y Atitlán.
 * El agua refleja el entorno de la escena.
 */
export function Lake({ radius = 2.4 }: LakeProps) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[radius, 96]} />
        <meshStandardMaterial
          color="#1a5f74"
          emissive="#0c3a48"
          emissiveIntensity={0.7}
          metalness={0.7}
          roughness={0.12}
          envMapIntensity={1.8}
        />
      </mesh>
      {/* Orilla */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <ringGeometry args={[radius, radius * 1.12, 96]} />
        <meshStandardMaterial color="#2a2622" roughness={1} flatShading />
      </mesh>
      {/* Los tres volcanes del lago */}
      <Volcano position={[-radius * 0.6, 0, -radius * 0.75]} radius={0.85} height={0.8} seed={4} color="#2b2620" />
      <Volcano position={[radius * 0.05, 0, -radius * 0.95]} radius={1.05} height={1.05} seed={5} color="#2b2620" />
      <Volcano position={[radius * 0.7, 0, -radius * 0.65]} radius={0.9} height={0.9} seed={6} color="#2b2620" />
      {/* Cayucos */}
      {[-0.6, 0.4, 0.9].map((x, index) => (
        <mesh key={index} position={[x, 0.05, radius * 0.35 + index * 0.25]} rotation={[0, index * 0.7, 0]}>
          <boxGeometry args={[0.28, 0.05, 0.08]} />
          <meshStandardMaterial color="#c9a46c" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
