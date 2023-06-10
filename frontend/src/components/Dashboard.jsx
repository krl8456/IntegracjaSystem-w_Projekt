import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function Dashboard() {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <Box sx={{ margin: "auto" }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5em",
          pl: "3em",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
          maxWidth: "800px",
          mx: "auto",
          pb: "4em",
          mt: "6em",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{ mt: mediaBreakpoint ? "1.5em" : "2em" }}
        >
          Profile
        </Typography>
        <Box sx={{display: "flex", alignItems: "center", gap: "0.5em"}}>
          <AccountCircleIcon sx={{ fontSize: "5em" }} />
          <Typography variant="h6" component="p">{user.name}</Typography>
        </Box>
        <Typography variant="body1" component="p">
          <strong>email: </strong>
          {user.email}
        </Typography>
        <Link
          to="/update-profile"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "15em", mt: "3em" }}
          >
            Update your profile
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default Dashboard;
