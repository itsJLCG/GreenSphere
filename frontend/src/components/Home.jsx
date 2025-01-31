import React, { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats, useTexture, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Platform = () => {
  const texture = useTexture("../assets/images/grass.webp");
  const { scene } = useGLTF("../assets/models/Trees.glb");

  const trees = useMemo(() => Array.from({ length: 9 }, () => scene.clone()), [scene]);

  const treeDetails = [
    { position: [-8, -1, -8], scale: 2 },
    { position: [8, -1, -8], scale: 2.1 },
    { position: [6, -1, -6], scale: 2 },
    { position: [-6.5, -1, -6], scale: 2.2 },
    { position: [4, -1, -8], scale: 2.3 },
    { position: [2, -1, -7], scale: 1.7 },
    { position: [1, -1, -8], scale: 2.2 },
    { position: [-1.5, -1, -7], scale: 2.4 },
    { position: [-4, -1, -8], scale: 1.8 }
  ];

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {treeDetails.map((tree, index) => (
        <primitive
          key={index}
          object={trees[index]}
          position={tree.position}
          scale={tree.scale}
        />
      ))}
    </>
  );
};


const Roofs = {
  Gable: ({ texturePath }) => {
    const roofTexture = useTexture(texturePath); // Dynamically use texture path
    return (
      <mesh position={[0, 7, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[5, 4, 4]} />
        <meshStandardMaterial map={roofTexture} />
      </mesh>
      
    );
  },
  Flat: () => {
    const roofTexture = useTexture('../assets/images/roof.jpg');
    return (
      <mesh position={[0, 5.5, 0]}>
        <boxGeometry args={[6, 1, 6]} />
        <meshStandardMaterial map={roofTexture} />
      </mesh>
    );
  },
  Shed: () => {
    const roofTexture = useTexture('../assets/images/roof.jpg');
    return (
      <mesh position={[0, 6, 0]} rotation={[Math.PI / 20, 0, 0]}>
        <boxGeometry args={[6, 1, 6]} />
        <meshStandardMaterial map={roofTexture} />
      </mesh>
    );
  },
  Butterfly: () => {
    const roofTexture = useTexture('../assets/images/roof.jpg');
    return (
      <group position={[-0.75, 5.30, 0]} rotation={[0, 4.75, 0]}>
        {/* Left side of the V-shaped roof */}
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 3, 0, 0]}>
          <boxGeometry args={[5.85, 3.25]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
        {/* Right side of the V-shaped roof */}
        <mesh position={[0, 0, -1]} rotation={[-Math.PI / 2.75, 0, 0]}>
          <boxGeometry args={[5.85, 6.25]} />
          <meshStandardMaterial map={roofTexture} />
        </mesh>
      </group>
    );
  },
};

// Window component
const Window = ({ position }) => {
  const windowTexture = useTexture("../assets/images/window.webp"); // ✅ Fixed syntax

  return (
    <mesh position={position}>
      <boxGeometry args={[0.85, 1.5, 0.1]} /> {/* Window size remains the same */}
      <meshStandardMaterial map={windowTexture} /> {/* ✅ Apply texture */}
    </mesh>
  );
};
const WindowCottage = ({ position }) => {
  const WindowCottage = useTexture("../assets/images/windowcottage.jpg"); // ✅ Fixed syntax

  return (
    <mesh position={position}>
      <boxGeometry args={[0.85, 1.5, 0.1]} /> {/* Window size remains the same */}
      <meshStandardMaterial map={WindowCottage} /> {/* ✅ Apply texture */}
    </mesh>
  );
};
const WindowMobile = ({ position }) => {
  const WindowCottage = useTexture("../assets/images/mobilewindow.jpg"); // ✅ Fixed syntax

  return (
    <mesh position={position}>
      <boxGeometry args={[0.85, 1.5, 0.1]} /> {/* Window size remains the same */}
      <meshStandardMaterial map={WindowCottage} /> {/* ✅ Apply texture */}
    </mesh>
  );
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

const CottagesHouse = () => {
  const wallTexture = useTexture("../assets/images/cottagewall.webp");
  const doorTexture = useTexture("../assets/images/cottagedoor.jpg");

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
      <WindowCottage position={[-2.5, 3, 3.01]} />
      <WindowCottage position={[2.5, 3, 3.01]} />

      {/* Automatically applying the Gable roof with custom texture */}
      <Roofs.Gable texturePath="../assets/images/cottageroof.jpg" />
    </group>
  );
};

const TownHouse = () => {
  const townTexture1 = useTexture("../assets/images/townwall1.jpg");
  const townTexture2 = useTexture("../assets/images/townwall2.jpg");
  const doorTexture = useTexture("../assets/images/door.jpg");
  const roofTexture = useTexture("../assets/images/townhouseroof.jpg");

  return (
    <group position={[0, 1, 0]}>
      {/* Base */}
      <mesh position={[0, 1.75, 0]}>
        <boxGeometry args={[5, 7.5, 6]} />
        <meshStandardMaterial map={townTexture2} />
      </mesh>
      <mesh position={[5, 2, 0]}>
        <boxGeometry args={[5, 8, 6]} />
        <meshStandardMaterial map={townTexture1} />
      </mesh>
      <mesh position={[-5, 2, 0]}>
        <boxGeometry args={[5, 8, 6]} />
        <meshStandardMaterial map={townTexture1} />
      </mesh>

      {/* Door */}
      <mesh position={[0, -0.5, 3.01]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial map={doorTexture} />
      </mesh>
      <mesh position={[5, -0.5, 3.01]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial map={doorTexture} />
      </mesh>
      <mesh position={[-5, -0.5, 3.01]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial map={doorTexture} />
      </mesh>

      {/* Windows */}
      <Window position={[-1.5, 3.5, 3.01]} />
      <Window position={[1.5, 3.5, 3.01]} />

      <Window position={[6.5, 3.5, 3.01]} />
      <Window position={[-6.5, 3.5, 3.01]} />

      <Window position={[3.5, 3.5, 3.01]} />
      <Window position={[-3.5, 3.5, 3.01]} />

      {/* Roof */}
      <mesh position={[0, 7, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[5, 4, 4]} />
        <meshStandardMaterial map={roofTexture} />
      </mesh>
      <mesh position={[5, 8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[5, 4, 4]} />
        <meshStandardMaterial map={roofTexture} />
      </mesh>
      <mesh position={[-5, 8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[5, 4, 4]} />
        <meshStandardMaterial map={roofTexture} />
      </mesh>
    </group>
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

const ApartmentsBuilding = () => {
  const wallTexture = useTexture("../assets/images/apartmentwall.avif");
  const roofTexture = useTexture("../assets/images/apartmentroof.webp");

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


const HouseModels = {
  "Single-Family": SingleFamilyHouse,
  "Cottages": CottagesHouse,
  "TownHouse": TownHouse,
  "Mobile Home": MobileHome,
};

const BuildingModels = {
  "Apartments": ApartmentsBuilding,
  "Office Building": OfficeBuilding,
};
const Home = () => {
  const [showHouseOptions, setShowHouseOptions] = useState(false);
  const [showBuildingOptions, setShowBuildingOptions] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [roofType, setRoofType] = useState(null);
  const [bgColor, setBgColor] = useState("#111"); // Default to black

  const toggleBackgroundColor = () => {
    setBgColor((prevColor) => (prevColor === "#111" ? "#A7C7E7" : "#111"));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Control Panel */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <div style={{ display: "flex", gap: "10px" }}>
          
          {/* Houses Button */}
          <div>
            <button
              onClick={() => { 
                setShowHouseOptions(!showHouseOptions);
                setShowBuildingOptions(false);  // Close Buildings menu if open
              }} 
              style={buttonStyle}
            >
              Houses
            </button>
            {showHouseOptions && (
              <div style={dropdownStyle}>
                {Object.keys(HouseModels).map((house) => (
                  <button
                    key={house}
                    onClick={() => { setSelectedHouse(house); setSelectedBuilding(null); setRoofType(null); }}
                    style={buttonStyle}
                  >
                    {house}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buildings Button */}
          <div>
            <button
              onClick={() => { 
                setShowBuildingOptions(!showBuildingOptions);
                setShowHouseOptions(false); // Close Houses menu if open
              }} 
              style={buttonStyle}
            >
              Buildings
            </button>
            {showBuildingOptions && (
              <div style={dropdownStyle}>
                {Object.keys(BuildingModels).map((building) => (
                  <button
                    key={building}
                    onClick={() => { setSelectedBuilding(building); setSelectedHouse(null); }}
                    style={buttonStyle}
                  >
                    {building}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Roof Selection - Only show if Single-Family house is selected */}
        {selectedHouse === "Single-Family" && (
          <div style={{ marginTop: 210 }}>
            <p style={{ color: "white", marginBottom: "5px" }}>Select Roof Type:</p>
            {Object.keys(Roofs).map((roof) => (
              <button key={roof} onClick={() => setRoofType(roof)} style={buttonStyle}>
                {roof}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleBackgroundColor}
        style={floatButtonStyle}
      >
        Day / Night Mode
      </button>

      {/* 3D Canvas */}
      <Canvas style={{ height: "100vh", background: bgColor }} camera={{ position: [10, 6, 10] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <OrbitControls />
        <Platform />
        <Stats />

        {/* Render Houses or Buildings */}
        {selectedHouse && React.createElement(HouseModels[selectedHouse], { roofType })}
        {selectedBuilding && React.createElement(BuildingModels[selectedBuilding])}
      </Canvas>
    </div>
  );
};

const buttonStyle = {
  background: "#1e1942",
  color: "white",
  padding: "10px 15px",
  margin: "5px 0",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  transition: "all 0.3s ease",
  width: "160px",
};

const dropdownStyle = {
  background: "#1e1942",
  color: "white",
  padding: "10px",
  position: "absolute",
  top: "50px",
  left: "0",
  zIndex: "9",
  width: "160px",
  borderRadius: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
};

// Floating Button Style
const floatButtonStyle = {
  position: "absolute",
  top: "20px",
  left: "1350px",
  background: "#1e1942",
  color: "white",
  border: "none",
  cursor: "pointer",
  zIndex: 20,
  fontSize: "14px",
};

export default Home;
