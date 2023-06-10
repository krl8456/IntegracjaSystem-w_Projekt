import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { stringify } from "flatted";

function Register() {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    }

    try {
      setError("");
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      console.log(response.data);
      const { access_token } = response.data;

      const tokenString = stringify(access_token);

      localStorage.setItem("token", tokenString);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
      console.error("Register error:", error);
    }

    setLoading(false);
  };

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
          Create an account
        </Typography>
        <Typography variant="body1" component="p">
          Username:
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
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Password:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
          inputRef={passwordRef}
          sx={{ width: "85%" }}
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Password confirmation:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
          inputRef={passwordConfirmRef}
          sx={{ width: "85%" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "3em", px: "4em", py: "1em", display: "block", mx: "auto" }}
          disabled={loading}
        >
          Sign up
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: "1.5em" }}>
            {error}
          </Alert>
        )}
        <Typography variant="body1" component="p" sx={{ mt: "2em" }}>
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
