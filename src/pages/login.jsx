import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CssBaseline
} from "@mui/material";
import { login } from "../api/user.js";
import Vase from "../assets/images/vintagevase.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem(
        "role",
        JSON.stringify({
          id: data.user_id,
          username: data.username,
          is_superuser: data.is_superuser,
          role: data.role,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline /> {/* resets body margin/padding */}
      <Grid container  spacing={5}>
        {/* Left Image Section */}
   <Grid
        item
size={{md:6}}
        sx={{

          m: 0,
          p: 0,
        }}
      >
        <img
          src={Vase}
          alt="Decorative Vase"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Grid>

        {/* Right Form Section */}
        <Grid
          item
          size={{md:6}}
          sx={{
            m: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img src={Vase} alt="Logo" width={60} height={60} />
              <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 'bold' }}>
                Login
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                Enter your credentials to access your account.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                placeholder="Enter your email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                <Link href="/forgot-password" underline="hover">
                  Forgot your password?
                </Link>
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: '#C62828',
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#B71C1C' }
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2">
                  Don’t have an account?{' '}
                  <Link href="/signup" underline="hover">
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
