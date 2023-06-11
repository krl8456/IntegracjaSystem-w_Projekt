import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Alert
} from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from '../contexts/UserContext';

function Login() {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        name: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      const { access_token } = response.data;

      localStorage.setItem('token', access_token);
      
      const getUser = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      
      setUser(getUser.data);
      navigate("/");
      
    } catch (error) {
      setError("Nieprawidłowy dane. Spróbuj jeszcze raz");
      console.error('Login error:', error);
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
          Zaloguj się
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
          Hasło:
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
          disabled={loading}
        >
          Zaloguj się
        </Button>
        {error && <Alert severity="error" sx={{mt: "1.5em"}}>{error}</Alert>}
        <Typography
          variant="body1"
          component="p"
          sx={{ mt: "2em", textAlign: "center" }}
        >
          Nie masz konta?{" "}
          <Link to={"/register"} className="text-blue-500">
            Zarejestruj sie
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
