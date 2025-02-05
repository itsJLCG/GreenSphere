import { useTexture } from "@react-three/drei";
import React, { useState, useMemo } from "react";

const OfficeBuilding = () => {
    const wallTexture = useTexture("../assets/images/officewall.jpg");
    const roofTexture = useTexture("../assets/images/officeroof.jpg");
  
    return (
      <group position={[0, 1.5, 0]}>
        {/* Floors (Stacked boxes to form a tall apartment) */}
        {[...Array(4)].map((_, i) => (
          <mesh key={i} position={[0, i * 5, 0]}>
            <boxGeometry args={[12, 5, 8]} /> {/* Wider and taller structure */}
            <meshStandardMaterial map={wallTexture} />
          </mesh>
        ))}
  
        {/* Roof */}
        <mesh position={[0, 17.75, 0]}>
          <boxGeometry args={[12, 0.5, 8.5]} /> {/* Flat roof with a slight overhang */}
          <meshStandardMaterial map={roofTexture} />
        </mesh>
      </group>
    );
  };

export default OfficeBuilding;