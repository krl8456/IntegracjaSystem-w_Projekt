import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  useMediaQuery,
  MenuItem,
  Menu,
  Box,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [anchorProfile, setAnchorProfile] = useState(null);
  const usernameBreakpoint = useMediaQuery("(min-width: 564px)");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };
  const handleProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar sx={{ display: "flex" }}>
        <Link to="/">My App</Link>
        {user ? (
          <Box sx={{ml: "auto"}}>
            <Link
              to="/chart"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="body1" component="span" sx={{color: "white"}}>
                  Wykresy
                </Typography>
            </Link>
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
                  {user.name}
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
                <MenuItem onClick={handleCloseProfile}>Mój profil</MenuItem>
              </Link>
              <Link
                to="/purchases"
                style={{ textDecoration: "none", color: "black" }}
              ></Link>
              <MenuItem
                onClick={() => {
                  handleCloseProfile();
                  handleLogout();
                }}
                sx={{ color: "red", borderTop: 1, borderTopColor: "gray" }}
              >
                Wyloguj się
              </MenuItem>
            </Menu>
          </Box>
        ) : token ? (
          <Typography variant="body1" component="span" sx={{ ml: "auto" }}>
            Moment...
          </Typography>
        ) : (
          <Box sx={{display: "flex", ml: "auto",  gap: 5}}>
            <Link color="inherit" to="/">
              Strona główna
            </Link>
            <Link color="inherit" to="/login">
              Zaloguj się
            </Link>
            <Link color="inherit" to="/register">
              Zarejestruj się
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
