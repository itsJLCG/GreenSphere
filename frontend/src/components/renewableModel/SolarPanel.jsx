import { useTexture } from "@react-three/drei";
import React, { useState, useMemo } from "react";

const SolarPanel = ({ position, rotation }) => {
  const panelTexture = useTexture("../assets/images/solarpanel.jpg"); // Change texture as needed
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={panelTexture} />
    </mesh>
  );
};

export default SolarPanel;