import { Typography, Box, Button, useMediaQuery, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();


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

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/user/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token", token);

      setUser(null);
      handleClose();
      navigate("/");
    } catch (error) {
      setError("Failed to delete an account");
      console.error("Delete error:", error);
    }

    setLoading(false);
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
          Profil
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
            >
              Zaauktualizuj profil
            </Button>
          </Link>

          <Button
            variant="contained"
            color="error"
            sx={{ width: "15em", mt: "3em" }}
            onClick={handleOpen}
          >
            Usuń profil
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
                Czy na pewno?
              </Typography>
              <Box sx={{ display: "flex", gap: 5 }}>
                <Button
                  onClick={handleDelete}
                  color="primary"
                  variant="contained"
                  disabled={loading}
                >
                  Tak
                </Button>
                <Button
                  onClick={handleClose}
                  color="error"
                  variant="contained"
                  disabled={loading}
                >
                  Anuluj
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
