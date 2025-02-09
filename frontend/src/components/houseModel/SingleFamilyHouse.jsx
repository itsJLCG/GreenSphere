import { useTexture } from "@react-three/drei";
import SolarPanel from "../renewableModel/SolarPanel.jsx";
import React, { useState } from "react";

// Pyramid/Gable Roof Grid with Solar Panels Toggle
const PyramidRoofGrid = ({ solarPanels, setSolarPanels, showSolarPanels }) => {
  const gridSize = 4; // Grid per side
  const cellSize = 2; // Size of each panel
  const roofHeight = 4; // Match coneGeometry height
  const baseSize = 10; // Match coneGeometry width

  // Pyramid slope angle
  const slopeAngle = Math.atan(roofHeight / (baseSize / 2));

  const handleClick = (side, row, col) => {
    if (solarPanels.some(([s, r, c]) => s === side && r === row && c === col)) {
      setSolarPanels(solarPanels.filter(([s, r, c]) => !(s === side && r === row && c === col)));
    } else {
      setSolarPanels([...solarPanels, [side, row, col]]);
    }
  };

  // Function to get correct side positions and rotations
  const getSideTransform = (side) => {
    switch (side) {
      case "north":
        return { position: [0, roofHeight / 2, -baseSize / 2], rotation: [slopeAngle, 0, 0] };
      case "south":
        return { position: [0, roofHeight / 2, baseSize / 2], rotation: [-slopeAngle, 0, 0] };
      case "east":
        return { position: [baseSize / 2, roofHeight / 2, 0], rotation: [0, 0, -slopeAngle] };
      case "west":
        return { position: [-baseSize / 2, roofHeight / 2, 0], rotation: [0, 0, slopeAngle] };
      default:
        return { position: [0, 0, 0], rotation: [0, 0, 0] };
    }
  };

  return (
    <group>
      {/* Render the grid for each pyramid face */}
      {["north", "south", "east", "west"].map((side) => {
        const { position, rotation } = getSideTransform(side);

        return (
          <group key={side} position={position} rotation={rotation}>
            {showSolarPanels &&
              Array.from({ length: gridSize - 1 }).map((_, row) =>
                Array.from({ length: gridSize - 1 }).map((_, col) => {
                  const x = (col - (gridSize - 2) / 2) * cellSize;
                  const y = (row - (gridSize - 2) / 2) * cellSize;
                  const isSelected = solarPanels.some(([s, r, c]) => s === side && r === row && c === col);

                  return (
                    <mesh key={`${side}-${row}-${col}`} position={[x, y, 0]} onClick={() => handleClick(side, row, col)}>
                      <planeGeometry args={[cellSize, cellSize]} />
                      <meshStandardMaterial color={isSelected ? "yellow" : "green"} opacity={0.8} transparent />
                    </mesh>
                  );
                })
              )}
          </group>
        );
      })}

      {/* Render selected solar panels */}
      {solarPanels.map(([side, row, col], index) => {
        const { position, rotation } = getSideTransform(side);
        const x = (col - (gridSize - 2) / 2) * cellSize;
        const y = (row - (gridSize - 2) / 2) * cellSize;

        return (
          <SolarPanel
            key={index}
            position={[position[0] + x, position[1] + y, position[2]]}
            rotation={rotation}
          />
        );
      })}
    </group>
  );
};



// Flat Roof Grid with Solar Panels Toggle
const FlatRoofGrid = ({ onSelect, solarPanels, setSolarPanels, showSolarPanels }) => {
    const gridSize = 3; // 3x3 grid
    const cellSize = 2; // Each cell is 2x2 in size
  
    const handleClick = (row, col) => {
      const cellKey = `${row}-${col}`;
      // Toggle Solar Panel: Add if not there, remove if already placed
      if (solarPanels.some(([r, c]) => r === row && c === col)) {
        // If the panel is already there, remove it
        setSolarPanels(solarPanels.filter(([r, c]) => r !== row || c !== col));
      } else {
        // Otherwise, add the panel
        setSolarPanels([...solarPanels, [row, col]]);
      }
    };
  
    return (
      <group position={[0, 6.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {showSolarPanels && Array.from({ length: gridSize }).map((_, row) =>
          Array.from({ length: gridSize }).map((_, col) => {
            const x = (col - 1) * cellSize; // Centering the grid
            const y = (row - 1) * cellSize;
            const isSelected = solarPanels.some(([r, c]) => r === row && c === col);
  
            return (
              <mesh
                key={`${row}-${col}`}
                position={[x, y, 0]} // Positions grid cells flat on the roof
                onClick={() => handleClick(row, col)}
              >
                <planeGeometry args={[cellSize, cellSize]} />
                <meshStandardMaterial
                  color={isSelected ? "yellow" : "green"}
                  transparent={true}
                  opacity={isSelected ? 0 : 0.5} // Make grid transparent if panel placed
                />
              </mesh>
            );
          })
        )}
  
        {/* Render Solar Panels */}
        {solarPanels.map(([row, col], index) => {
          const x = (col - 1) * cellSize;
          const y = (row - 1) * cellSize;
          return <SolarPanel key={index} position={[x, y, 0]} />;
        })}
      </group>
    );
  };
  
//shed roof grid (done tilt)
  const ShedRoofGrid = ({ solarPanels, setSolarPanels, showSolarPanels }) => {
    const gridSize = 3; // 3x3 grid
    const cellSize = 2; // Each cell is 2x2
    const roofAngle = Math.PI / 2.221; // Adjust based on your roof's slope
    const roofHeight = 6.5; // Raised slightly to fit exactly on the roof
  
    const handleClick = (row, col) => {
      const cellKey = `${row}-${col}`;
      if (solarPanels.some(([r, c]) => r === row && c === col)) {
        setSolarPanels(solarPanels.filter(([r, c]) => r !== row || c !== col));
      } else {
        setSolarPanels([...solarPanels, [row, col]]);
      }
    };
  
    return (
      <group position={[0, roofHeight, 0]} rotation={[-roofAngle, 0, 0]}>
        {/* Clickable Grid for Solar Panels */}
        {showSolarPanels &&
          Array.from({ length: gridSize }).map((_, row) =>
            Array.from({ length: gridSize }).map((_, col) => {
              const x = (col - 1) * cellSize;
              const y = (row - 1) * cellSize;
              const isSelected = solarPanels.some(([r, c]) => r === row && c === col);
  
              return (
                <mesh
                  key={`${row}-${col}`}
                  position={[x, y, 0.01]}
                  onClick={() => handleClick(row, col)}
                >
                  <planeGeometry args={[cellSize, cellSize]} />
                  <meshStandardMaterial color={isSelected ? 'yellow' : 'green'} transparent opacity={isSelected ? 0 : 0.5} />
                </mesh>
              );
            })
          )}
  
        {/* Render Solar Panels */}
        {solarPanels.map(([row, col], index) => {
          const x = (col - 1) * cellSize;
          const y = (row - 1) * cellSize;
          return <SolarPanel key={index} position={[x, y, 0.1]} />;
        })}
      </group>
    );
  };

  

const ButterflyRoofGrid = ({ solarPanels, setSolarPanels, showSolarPanels }) => {
    const gridSize = 3; // 3x3 grid
    const cellSize = 2; // Each cell is 2x2 in size

    const handleClick = (row, col, section) => {
        const cellKey = `${section}-${row}-${col}`;
        if (solarPanels.some(([s, r, c]) => s === section && r === row && c === col)) {
            setSolarPanels(solarPanels.filter(([s, r, c]) => !(s === section && r === row && c === col)));
        } else {
            setSolarPanels([...solarPanels, [section, row, col]]);
        }
    };

    return (
        <group position={[-0.75, 5.3 + 0.1, 0]} rotation={[0, 4.75, 0]}>
            {/* Left Sloped Section */}
            {showSolarPanels && <group position={[0, 0.05, 1]} rotation={[Math.PI / 3, 0, 0]}>
                {Array.from({ length: gridSize }).map((_, row) =>
                    Array.from({ length: gridSize }).map((_, col) => {
                        const x = (col - 1) * cellSize;
                        const y = (row - 1) * cellSize;
                        const isSelected = solarPanels.some(([s, r, c]) => s === "left" && r === row && c === col);
                        return (
                            <mesh
                                key={`left-${row}-${col}`}
                                position={[x, y, 0.05]} // Slightly above the roof
                                onClick={() => handleClick(row, col, "left")}
                            >
                                <planeGeometry args={[cellSize, cellSize]} />
                                <meshStandardMaterial color={isSelected ? "yellow" : "green"} opacity={isSelected ? 0 : 0.5} />
                            </mesh>
                        );
                    })
                )}
            </group>}
            
            {/* Right Sloped Section */}
            {showSolarPanels && <group position={[0, 0.05, -1]} rotation={[-Math.PI / 2.75, 0, 0]}>
                {Array.from({ length: gridSize }).map((_, row) =>
                    Array.from({ length: gridSize }).map((_, col) => {
                        const x = (col - 1) * cellSize;
                        const y = (row - 1) * cellSize;
                        const isSelected = solarPanels.some(([s, r, c]) => s === "right" && r === row && c === col);
                        return (
                            <mesh
                                key={`right-${row}-${col}`}
                                position={[x, y, 0.05]} // Slightly above the roof
                                onClick={() => handleClick(row, col, "right")}
                            >
                                <planeGeometry args={[cellSize, cellSize]} />
                                <meshStandardMaterial color={isSelected ? "yellow" : "green"} opacity={isSelected ? 0 : 0.5} />
                            </mesh>
                        );
                    })
                )}
            </group>}
        </group>
    );
};

// Roofs Component
export const Roofs = {
  Gable: ({ texturePath, showSolarPanels }) => {
    const roofTexture = useTexture(texturePath);
    const [solarPanels, setSolarPanels] = useState([]);

    return (
      <group>
        {/* Roof Base */}
        <mesh position={[0, 7, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[5, 4, 4]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        {/* Recommended Area Grid & Solar Panels */}
        <PyramidRoofGrid
          solarPanels={solarPanels}
          setSolarPanels={setSolarPanels}
          showSolarPanels={showSolarPanels}
        />
      </group>
    );
  },
  Flat: ({ showSolarPanels }) => {
    const roofTexture = useTexture("../assets/images/roof.jpg");
    const [solarPanels, setSolarPanels] = useState([]);

    return (
      <group>
        {/* Roof Base */}
        <mesh position={[0, 5.5, 0]}>
          <boxGeometry args={[6, 1, 6]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        {/* Recommended Area Grid & Solar Panels */}
        <FlatRoofGrid
          solarPanels={solarPanels}
          setSolarPanels={setSolarPanels}
          showSolarPanels={showSolarPanels}
        />
      </group>
    );
  },
  Shed: ({ showSolarPanels }) => {
    const roofTexture = useTexture("../assets/images/roof.jpg");
    const [solarPanels, setSolarPanels] = useState([]);

    return (
      <group>
        {/* Roof Base with Slight Rotation */}
        <mesh position={[0, 6, 0]} rotation={[Math.PI / 20, 0, 0]}>
          <boxGeometry args={[6, 1, 6]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        {/* Recommended Area Grid & Solar Panels */}
        <ShedRoofGrid
          solarPanels={solarPanels}
          setSolarPanels={setSolarPanels}
          showSolarPanels={showSolarPanels}
        />
      </group>
    );
  },
  Butterfly: ({ showSolarPanels }) => {
    const roofTexture = useTexture("../assets/images/roof.jpg");
    const [solarPanels, setSolarPanels] = useState([]);
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
        <ButterflyRoofGrid solarPanels={solarPanels} setSolarPanels={setSolarPanels} showSolarPanels={showSolarPanels} />
      </group>
    );
  },
};

// Window Component
export const Window = ({ position }) => {
  const windowTexture = useTexture("../assets/images/window.webp");
  return (
    <mesh position={position}>
      <boxGeometry args={[0.85, 1.5, 0.1]} />
      <meshStandardMaterial map={windowTexture} />
    </mesh>
  );
};

// Single Family House Component
const SingleFamilyHouse = ({ roofType, showSolarPanels }) => {
  const wallTexture = useTexture("../assets/images/wall.png");
  const doorTexture = useTexture("../assets/images/door.jpg");

  return (
    <group position={[0, 0, 0]}>
      {/* Walls */}
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
      {roofType && React.createElement(Roofs[roofType], { texturePath: "../assets/images/roof.jpg", showSolarPanels })}
    </group>
  );
};

export default SingleFamilyHouse;