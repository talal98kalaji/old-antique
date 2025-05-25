import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user.is_superuser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
