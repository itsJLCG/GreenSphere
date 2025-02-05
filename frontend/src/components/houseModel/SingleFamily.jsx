import { useTexture } from "@react-three/drei";
import React, { useState, useMemo } from "react";

export const Roofs = {
  Gable: ({ texturePath }) => {
    const roofTexture = useTexture(texturePath);
    return (
      <group>
        <mesh position={[0, 7, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[5, 4, 4]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
      </group>
    );
  },
  Flat: () => {
    const roofTexture = useTexture("../assets/images/roof.jpg");
    return (
      <group>
        <mesh position={[0, 5.5, 0]}>
          <boxGeometry args={[6, 1, 6]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        <SolarPanel position={[0, 6.2, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    );
  },
  Shed: () => {
    const roofTexture = useTexture("../assets/images/roof.jpg");
    return (
      <group>
        <mesh position={[0, 6, 0]} rotation={[Math.PI / 20, 0, 0]}>
          <boxGeometry args={[6, 1, 6]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        <SolarPanel position={[0, 7, 1.5]} rotation={[Math.PI / 6, 0, 0]} />
      </group>
    );
  },
  Butterfly: () => {
    const roofTexture = useTexture("../assets/images/roof.jpg");
    return (
      <group position={[-0.75, 5.3, 0]} rotation={[0, 4.75, 0]}>
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 3, 0, 0]}>
          <boxGeometry args={[5.85, 3.25]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        <mesh position={[0, 0, -1]} rotation={[-Math.PI / 2.75, 0, 0]}>
          <boxGeometry args={[5.85, 6.25]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        <SolarPanel position={[0, 7, 0]} rotation={[Math.PI / 4, 0, 0]} />
      </group>
    );
  },
};

const SingleFamilyHouse = ({ roofType }) => {
  const wallTexture = useTexture("../assets/images/wall.png");
  const doorTexture = useTexture("../assets/images/door.jpg");

  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[6, 6, 6]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.5, 3.01]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial map={doorTexture} />
      </mesh>

      {/* Windows */}
      <Window position={[-2.5, 3, 3.01]} />
      <Window position={[2.5, 3, 3.01]} />

      {/* Roof */}
      {roofType && React.createElement(Roofs[roofType], { texturePath: '../assets/images/roof.jpg' })}
    </group>
  );
};

export default SingleFamilyHouse;