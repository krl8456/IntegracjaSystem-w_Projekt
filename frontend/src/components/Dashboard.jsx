import { Typography, Box, Button, useMediaQuery, Modal } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function Dashboard() {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  if (!user) {
    return <></>;
  }

  const handleDelete = async () => {
    
  };

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
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
          <AccountCircleIcon sx={{ fontSize: "5em" }} />
          <Typography variant="h5" component="p">
            {user.name}
          </Typography>
        </Box>
        <Typography variant="body1" component="p">
          <strong>email: </strong>
          {user.email}
        </Typography>
        <Box sx={{ display: "flex", gap: "2em" }}>
          <Link
            to="/update-profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "15em", mt: "3em" }}
              onClick={handleDelete}
            >
              Update your profile
            </Button>
          </Link>

          <Button
            variant="contained"
            color="error"
            sx={{ width: "15em", mt: "3em" }}
            onClick={handleOpen}
          >
            Delete your profile
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-delete-profile"
            aria-describedby="by clicking this yes in this modal you can delete your account"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h3"
                component="h2"
                sx={{ mb: 10 }}
              >
                Are you sure?
              </Typography>
              <Box sx={{display: "flex", gap: 5}}>
                <Button
                  onClick={handleDelete}
                  color="primary"
                  variant="contained"
                >
                  Yes
                </Button>
                <Button onClick={handleClose} color="error" variant="contained">
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
