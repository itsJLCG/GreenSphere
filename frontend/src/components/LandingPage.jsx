import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stats, useGLTF } from '@react-three/drei';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

// A component that handles the rotation animation
const RotatingModel = ({ scene }) => {
    const modelRef = useRef();
  
    // Rotate the model on every frame
    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.x += 0.01; // Rotate around the X-axis
      }
    });
  
    return (
      <primitive 
        object={scene} 
        position={[0, 2, 0]} 
        scale={[1, 1, 1]} 
        ref={modelRef}
      />
    );
  };
  
  // A component for rotating text
  const RotatingText = ({ scene }) => {  // Fix: Use "scene" instead of "text"
    const modelRef = useRef();
  
    // Rotate the text model
    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Rotate around the X-axis
      }
    });
  
    return (
      <primitive 
        object={scene}  // Fix: Use the correct "scene" property
        position={[0, -1, -3]} 
        scale={[0.1, 0.1, 0.1]} 
        ref={modelRef}
      />
    );
  };

const LandingPage = () => {
  // Load the .glb models
  const { scene: logoScene } = useGLTF('/assets/models/greenspherelogo.glb');
  const { scene: textScene } = useGLTF('/assets/models/greenspheretext.glb');

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #1e1942, #3a2d69)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 3D Canvas */}
      <Canvas style={{ height: '100vh', width: '100%' }}>
        <OrbitControls />
        
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        {/* Render the rotating models */}
        <RotatingModel scene={logoScene} />  
        <RotatingText scene={textScene} />  
      </Canvas>

      {/* Developer Info (Glassmorphic Card) */}
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
    </Box>
  );
};

export default LandingPage;
