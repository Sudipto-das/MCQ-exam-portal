// SignUp.js

import { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
const theme = createTheme();

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Logged in successfully');
      } else {
        console.error('Failed to log in');
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{marginTop:'5em'}}>
        <CssBaseline />
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" color="primary">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="username"
              type="email"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Sign In
            </Button>
          </form>
          <span >New User?</span>
          <Link to="/" style={{ color: "#43BD78" }}>
          Signup
        </Link>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;