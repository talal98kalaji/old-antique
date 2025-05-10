import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Switch, FormControlLabel, } from '@mui/material';
  
const Navbar = ({mode ,setMode}) => {
  const isDark = mode === 'dark';
  const isAuthenticated = !!localStorage.getItem("token"); 
  const navigate = useNavigate('')
	const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };        

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Antique Shop
        </Typography>
				<FormControlLabel
          control={<Switch checked={isDark} onChange={handleToggle} />}
          label={isDark ? 'Dark' : 'Light'}
        /> 

        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear()
                navigate('antique-front/')                 
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
