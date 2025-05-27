import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await axios.get('/api/user/');
          setUser({
            id: response.data.id,
            username: response.data.username,
            is_superuser: response.data.is_superuser,
            role: response.data.is_superuser ? 'superuser' : response.data.role || 'customer'
          });
        } catch (err) {
          console.error('Error fetching user data:', err);
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            logout();
          }
          setError('Authentication failed. Please log in again.');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/login/', credentials);
      const { access, refresh, role } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_role', role);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      const userResponse = await axios.get('/api/user/');
      const userData = {
        id: userResponse.data.id,
        username: userResponse.data.username,
        is_superuser: userResponse.data.is_superuser,
        role: role
      };
      
      setUser(userData);
      
      if (role === 'superuser') {
        navigate('/dashboard');
      } else if (role === 'data_entry') {
        navigate('/data-entry');
      } else {
        navigate('/user/home');
      }
      
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      return { success: false, error: err.response?.data?.detail || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post('/api/token/refresh/', { refresh });
      const { access } = response.data;
      
      localStorage.setItem('access_token', access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      return true;
    } catch (err) {
      console.error('Token refresh failed:', err);
      logout();
      return false;
    }
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          const refreshed = await refreshToken();
          if (refreshed) {
            return axios(originalRequest);
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const hasRole = (requiredRole) => {
    if (!user) return false;
    
    if (user.is_superuser) return true;
    
    return user.role === requiredRole;
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    refreshToken,
    hasRole,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
