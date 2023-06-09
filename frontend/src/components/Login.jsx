import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Login() {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
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
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: "1em", textAlign: "center" }}
        >
          Log in
        </Typography>
        <Typography variant="body1" component="p">
          Email:
        </Typography>
        <TextField
          id="standard-basic"
          type="email"
          variant="standard"
          color="secondary"
          autoComplete="off"
          autoFocus
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "3em", px: "4em", py: "1em", display: "block", mx: "auto" }}
        >
          Log In
        </Button>
        <Typography
          variant="body1"
          component="p"
          sx={{ mt: "2em", textAlign: "center" }}
        >
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
