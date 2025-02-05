import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Box, Typography, Grid, Paper } from '@mui/material';

const RotatingLogo = ({ scene, position, scale }) => {
  const logoRef = useRef();

  useFrame(() => {
    if (logoRef.current) {
      logoRef.current.rotation.x = Math.PI / 2; // Rotate 90 degrees
    }
  });

  return <primitive ref={logoRef} object={scene} position={position} scale={scale} />;
};

const StaticModel = ({ scene, position, scale }) => {
  return <primitive object={scene} position={position} scale={scale} />;
};

const Platform = () => {
  return (
    <mesh position={[0, -2.5, 0]}>
      <cylinderGeometry args={[3, 3, 0.2, 32]} />
      <meshStandardMaterial color="#649860" />
    </mesh>
  );
};

const LandingPage = () => {
  const { scene: logoScene } = useGLTF('/assets/models/greenspherelogo.glb');
  const { scene: textScene } = useGLTF('/assets/models/greenspheretext.glb');
  const { scene: textScenes } = useGLTF('/assets/models/fronttext.glb');

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        background: '#0e0a36',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Canvas style={{ height: '100vh', width: '100%' }} camera={{ position: [0, 0, 8] }}>
        <OrbitControls />

        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        {/* Platform */}
        <Platform />

        {/* Rotating Logo */}
        <RotatingLogo scene={logoScene} position={[0, 1.7, 0.2]} scale={[1, 1, 1]} />
        <StaticModel scene={textScene} position={[0, -1.1, 0]} scale={[0.1, 0.1, 0.1]} />
        <StaticModel scene={textScenes} position={[0, 13, -5]} scale={[0.1, 0.1, 0.1]} />
      </Canvas>

      {/* Developer Info */}
      <Paper
        elevation={6}
        sx={{
          position: 'absolute',
          bottom: 140,
          left: 20,
          padding: '20px 30px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          textAlign: 'center',
          width: '300px',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Developer of the System
        </Typography>
        <Grid container spacing={1}>
          {["Gayapa, Jhon Ludwig C.", "Barte, Gwyn S.", "Obreros, Jhun Mark G.", "Prado, Kristine Mae"].map((name, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body2">{name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper
        elevation={6}
        sx={{
          position: 'absolute',  // Position the paper element
          top: 50,  // Adjust this value to the height of your header
          padding: '20px 30px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          textAlign: 'center',
          width: 'auto',
          left:  'auto',
        }}
      >
        <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold', mb: 1 }}>
          A simulator for designing and applying renewable energy solutions. Start building your greener future today!
        </Typography>
      </Paper>

    </Box>
  );
};

export default LandingPage;
