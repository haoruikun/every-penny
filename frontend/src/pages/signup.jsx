import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/copyright";
import "../css/login.css";
import logo from "../assets/logo.svg";
import Alert from "@mui/material/Alert";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(false);
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password1 !== password2) {
      setPassword2Error(true);
    } else {
      setPassword2Error(false);
      fetch("http://localhost:3002/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          password: password2,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.result !== "success") {
            setError(json.result);
            props.setSignUp(true);
            props.setLoggedInUser(null);
          } else {
            setError(null);
            props.setLogin(true);
            props.setSignUp(false);
            props.setLoggedInUser(username);
          }
        });
    }
  };
  useEffect(() => {
    document.title = "Sign Up";
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Every Penny" className="logo" />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 1, width: "100%" }}>
            {error}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password1}
                onChange={handlePassword1Change}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={password2Error}
                helperText={password2Error ? "Password does not match." : null}
                required
                fullWidth
                name="password2"
                label="Confirm Your Password"
                type="password"
                id="password2"
                autoComplete="new-password"
                value={password2}
                onChange={handlePassword2Change}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, boxShadow: 0 }}
            disabled={username === "" || password1 === "" || password2 === ""}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  props.setSignUp(false);
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
