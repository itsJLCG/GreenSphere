import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../App";
import greensphereLogo from "../assets/images/greenspherelogo.png"; // Import the logo
import Logout from './Logout';

const Navbar = () => {
  const isLoggedIn = useContext(IsLoggedInContext);
  const button = {
    marginRight: "15px",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "0.4rem 1.2rem",
    borderRadius: "0.8rem",
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(5, 0, 46, 0.9)", // Slightly transparent to match the gradient
        padding: "0.5rem 1rem",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo and Title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={greensphereLogo}
            alt="GreenSphere Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#FFFFFF",
              letterSpacing: "1px",
            }}
          >
            GreenSphere
          </Typography>
        </div>

        {/* Buttons */}
        <div>
          {isLoggedIn ? (
            <>
            <Button
                style={{
                  ...button,
                  backgroundColor: "#007BFF",
                  color: "#FFFFFF",
                }}
                to="/home"
                component={Link}
                variant="contained"
              >
                Home
              </Button>
              <Button
                style={{
                  ...button,
                  backgroundColor: "#007BFF",
                  color: "#FFFFFF",
                }}
                to="/feedback"
                component={Link}
                variant="contained"
              >
                Feedback
              </Button>
              <Logout />
            </>
          ) : (
            <>
              <Button
                style={{
                  ...button,
                  backgroundColor: "#3333FF",
                  color: "#FFFFFF",
                }}
                to="/login"
                component={Link}
                variant="contained"
              >
                Login
              </Button>
              <Button
                style={{
                  ...button,
                  backgroundColor: "#5555FF",
                  color: "#FFFFFF",
                }}
                to="/signup"
                component={Link}
                variant="contained"
              >
                Signup
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
