import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import { darkTheme, lightTheme } from "./theme.js";
import { ThemeProvider, CssBaseline } from '@mui/material';
import DashboardPage from "./pages/dashboard/dashboard";
import DashboardLayout from "./components/layouts/DashboardLayout.jsx";
import ProductsPage from "./pages/dashboard/products/products.jsx";
import AdminRoute from "./components/homepage/AdminRoute.jsx";
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
      
      <Routes>
        {/* Non-dashboard routes without DashboardLayout */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        
        {/* Dashboard routes with DashboardLayout */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/*" element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/add-edit/:id?" element={<AddEditForm />} />
                <Route path="/users" element={<UsersPage />} />
              </Routes>
            </DashboardLayout>
          } />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default AppContent;
