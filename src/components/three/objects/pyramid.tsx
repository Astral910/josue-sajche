"use client";

interface PyramidProps {
  /** Ancho de la base. */
  base?: number;
  tiers?: number;
  color?: string;
}

/** Templo escalonado inspirado en el Templo I de Tikal (Gran Jaguar). */
export function Pyramid({ base = 3, tiers = 9, color = "#7a6f63" }: PyramidProps) {
  const tierHeight = 0.2;
  const shrink = (base * 0.62) / tiers;
  const bodyHeight = tiers * tierHeight;
  const topWidth = base - shrink * tiers;

  return (
    <group>
      {Array.from({ length: tiers }, (_, index) => {
        const width = base - shrink * index;
        return (
          <mesh key={index} position={[0, tierHeight * index + tierHeight / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[width, tierHeight, width]} />
            <meshStandardMaterial color={color} roughness={0.95} flatShading />
          </mesh>
        );
      })}

      {/* Escalinata frontal: una losa inclinada desde la base hasta el templo */}
      <mesh
        position={[0, bodyHeight / 2 + 0.03, (base / 2 + topWidth / 2) / 2 + 0.03]}
        rotation={[-Math.atan2((base - topWidth) / 2, bodyHeight), 0, 0]}
        castShadow
      >
        <boxGeometry args={[base * 0.22, Math.hypot(bodyHeight, (base - topWidth) / 2), 0.08]} />
        <meshStandardMaterial color="#8d8175" roughness={0.9} flatShading />
      </mesh>

      {/* Templo superior y crestería */}
      <mesh position={[0, bodyHeight + 0.3, 0]} castShadow>
        <boxGeometry args={[topWidth * 0.85, 0.6, topWidth * 0.7]} />
        <meshStandardMaterial color="#6d6257" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, bodyHeight + 0.6 + 0.42, -topWidth * 0.12]} castShadow>
        <boxGeometry args={[topWidth * 0.7, 0.84, topWidth * 0.22]} />
        <meshStandardMaterial color="#655a50" roughness={0.9} flatShading />
      </mesh>
      {/* Puerta */}
      <mesh position={[0, bodyHeight + 0.22, topWidth * 0.36]}>
        <boxGeometry args={[0.22, 0.4, 0.05]} />
        <meshStandardMaterial color="#0b0b0b" roughness={1} />
      </mesh>
    </group>
  );
}
