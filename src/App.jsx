import React, { useEffect, useState } from "react";
import {Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import { darkTheme,lightTheme } from "./theme.js";
import { ThemeProvider, CssBaseline } from '@mui/material';
import DashboardPage from "./pages/dashboard/dashboard";
import DashboardLayout from "./components/layouts/DashboardLayout.jsx";
import ProductsPage from "./pages/dashboard/products/products.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UsersPage from "./pages/dashboard/users/users.jsx";
import AddEditForm from "./pages/dashboard/products/add-edit.jsx"

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
      <DashboardLayout />
      <Routes>
        <Route path="/home" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
      <Routes>
        <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<DashboardPage   />} />
        <Route path="/dashboard/products" element={<ProductsPage   />} />
        <Route path="/dashboard/products/add-edit/:id?" element={<AddEditForm />} />
        <Route path="/dashboard/users/" element={<UsersPage   />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default AppContent;