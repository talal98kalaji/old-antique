import React, { useEffect, useState } from "react";
import {Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import HomePage from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import { darkTheme,lightTheme } from "./theme.js";
import { ThemeProvider, CssBaseline } from '@mui/material';
import DashboardPage from "./pages/dashboard/dashboard";

function AppContent() {
  const location = useLocation();           
  const [mode, setMode] = useState('light');

  useEffect(() => {                         
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark' || savedMode === 'light') {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {                         
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} setMode={setMode} key={location.pathname} />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage   />} />

      </Routes>
    </ThemeProvider>
  );
}

export default AppContent;