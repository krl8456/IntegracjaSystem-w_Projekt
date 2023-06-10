import { AppBar, Typography, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar sx={{ display: "flex" }}>
        <Typography variant="h6" component="div">
          My App
        </Typography>
        <div className="ml-auto flex gap-10">
          <Link color="inherit" to="/">
            Home
          </Link>
          <Link color="inherit" to="/login">
            Login
          </Link>
          <Link color="inherit" to="/register">
            Register
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
