import { AccountCircle } from "@mui/icons-material";
import { AppBar, Typography, Toolbar, IconButton, useMediaQuery, MenuItem, Menu } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const [anchorProfile, setAnchorProfile] = useState(null);
  const usernameBreakpoint = useMediaQuery("(min-width: 564px)");
  const navigate = useNavigate(); 

  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };
  const handleProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleLogout = async () => {
    try {
        console.log(token);
        await axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        localStorage.removeItem('token');
        window.location.reload();
        navigate("/");
    } catch (error) {
        console.error('Logout error:', error);
    }
};

  return (
    <AppBar position="static" color="secondary">
      <Toolbar sx={{ display: "flex" }}>
        <Typography variant="h6" component="div">
          My App
        </Typography>
        {token ? (
          <div className="ml-auto">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfile}
              color="inherit"
            >
              <AccountCircle sx={{ mr: ".5em" }} />
              {usernameBreakpoint && (
                <Typography variant="body1" component="span">
                  email
                </Typography>
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorProfile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorProfile)}
              onClose={handleCloseProfile}
              sx={{ mt: 6, ml: -3, w: "5em" }}
            >
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
              </Link>
              <Link
                to="/purchases"
                style={{ textDecoration: "none", color: "black" }}
              >
              </Link>
              <MenuItem
                onClick={() => {
                  handleCloseProfile();
                  handleLogout();
                }}
                sx={{ color: "red", borderTop: 1, borderTopColor: "gray" }}
              >
                Log out
              </MenuItem>
            </Menu>
          </div>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
}
