import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const UpdateProfile = () => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(passwordRef.current.value.length < 8 || passwordConfirmRef.current.value.length < 8) {
      return setError("Hasło musi posiadać co najmniej 8 znaków");
    }

    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError("Passwords don't match");
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.put(
        "http://127.0.0.1:8000/api/user/update",
        {
          name: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const getUser = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(getUser.data);
      navigate("/");
    } catch (e) {
      if (e.response.data.errors.name && e.response.data.errors.email) {
        setError("Podana nazwa użytkownika i email są zajęte")
      }
      else if (e.response.data.errors.name) {
        setError(e.response.data.errors.name)
      }
      else {
        setError(e.response.data.errors.email)
      }
      console.error("Update Error:", e);
    }
    setLoading(false);
  };
  if (!user) {
    return <></>;
  }
  return (
    <Box
      sx={{
        paddingBottom: "4em",
        paddingTop: mediaBreakpoint ? "4em" : "8em",
        px: "1em",
      }}
    >
      <Box
        component="form"
        sx={{
          maxWidth: "600px",
          p: "3em",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
          mx: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: "1em", textAlign: "center" }}
        >
          Zaaktualizuj swój profil
        </Typography>
        <Typography variant="body1" component="p">
          Nazwa:
        </Typography>
        <TextField
          id="standard-basic"
          type="text"
          variant="standard"
          color="secondary"
          autoComplete="off"
          autoFocus
          inputRef={usernameRef}
          sx={{ width: "85%" }}
          defaultValue={user.name}
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Email:
        </Typography>
        <TextField
          id="standard-basic"
          type="email"
          variant="standard"
          color="secondary"
          autoComplete="off"
          inputRef={emailRef}
          sx={{ width: "85%" }}
          defaultValue={user.email}
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Hasło:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
          inputRef={passwordRef}
          sx={{ width: "85%" }}
          placeholder="Hasło powinno zawierać co najmniej 8 znaków"
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Powtórz hasło:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
          inputRef={passwordConfirmRef}
          sx={{ width: "85%" }}
          placeholder="Hasło powinno zawierać co najmniej 8 znaków"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "3em", px: "4em", py: "1em", display: "block", mx: "auto" }}
          disabled={loading}
        >
          Zaaktulizuj
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: "1.5em" }}>
            {error}
          </Alert>
        )}

        <Link
          to={"/Dashboard"}
          style={{ marginTop: "2em", display: "block", textAlign: "center" }}
        >
          Anuluj
        </Link>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
