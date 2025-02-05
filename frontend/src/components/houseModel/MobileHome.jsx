import { useTexture } from "@react-three/drei";
import React, { useState, useMemo } from "react";

const WindowMobile = ({ position }) => {
  const WindowCottage = useTexture("../assets/images/mobilewindow.jpg"); // ✅ Fixed syntax

  return (
    <mesh position={position}>
      <boxGeometry args={[0.85, 1.5, 0.1]} /> {/* Window size remains the same */}
      <meshStandardMaterial map={WindowCottage} /> {/* ✅ Apply texture */}
    </mesh>
  );
};

const MobileHome = () => {
    const wallTexture = useTexture("../assets/images/mobilewall.jpg"); // Adjusted texture path
    const doorTexture = useTexture("../assets/images/mobiledoor.jpg"); // Adjusted texture path
    const wheelTexture = useTexture("../assets/images/wheel.jpg"); // Adjusted texture path for wheels
  
    return (
      <group position={[0, 0, 0]}>
        {/* Base */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[10, 4, 5]} /> {/* Adjusted size to be more typical for a mobile home */}
          <meshStandardMaterial map={wallTexture} />
        </mesh>
  
        {/* Door */}
        <mesh position={[0, 1.5, 2.6]}>
          <boxGeometry args={[3, 2.5, 0.1]} /> {/* Wider and lower door typical for mobile homes */}
          <meshStandardMaterial map={doorTexture} />
        </mesh>
  
        {/* Windows */}
        <WindowMobile position={[-3, 2, 2.6]} /> {/* Larger windows for mobile home */}
        <WindowMobile position={[3, 2, 2.6]} />
  
        {/* Flat roof for the mobile home */}
        <mesh position={[0, 4, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[10.75, 1, 5.75]} /> {/* Flat roof larger than base with overhang */}
          <meshStandardMaterial map={useTexture("../assets/images/mobileroof.jpg")} />
        </mesh>
  
        {/* Wheels */}
        {/* Front left wheel */}
        <mesh position={[-4, 0, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.5, 32]} /> {/* Wheel geometry */}
          <meshStandardMaterial map={wheelTexture} />
        </mesh>
  
        {/* Front right wheel */}
        <mesh position={[4, 0, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.5, 32]} /> {/* Wheel geometry */}
          <meshStandardMaterial map={wheelTexture} />
        </mesh>
  
        {/* Back left wheel */}
        <mesh position={[-4, 0, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.5, 32]} /> {/* Wheel geometry */}
          <meshStandardMaterial map={wheelTexture} />
        </mesh>
  
        {/* Back right wheel */}
        <mesh position={[4, 0, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.5, 32]} /> {/* Wheel geometry */}
          <meshStandardMaterial map={wheelTexture} />
        </mesh>
      </group>
    );
  };

export default MobileHome;