import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the authentication context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        try {
          // Configure axios to use the token for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch current user data
          const response = await axios.get('/api/user/');
          setUser({
            id: response.data.id,
            username: response.data.username,
            is_superuser: response.data.is_superuser,
            role: response.data.is_superuser ? 'superuser' : response.data.role || 'customer'
          });
        } catch (err) {
          console.error('Error fetching user data:', err);
          // If token is invalid or expired, clear localStorage
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

  // Function to handle user login
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/login/', credentials);
      const { access, refresh, role } = response.data;
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_role', role);
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      // Fetch user data
      const userResponse = await axios.get('/api/user/');
      const userData = {
        id: userResponse.data.id,
        username: userResponse.data.username,
        is_superuser: userResponse.data.is_superuser,
        role: role
      };
      
      setUser(userData);
      
      // Redirect based on role
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

  // Function to handle user logout
  const logout = () => {
    // Clear user data and tokens
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  // Function to refresh the token
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

  // Setup axios interceptor for token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          const refreshed = await refreshToken();
          if (refreshed) {
            // Retry the original request with new token
            return axios(originalRequest);
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    // Clean up interceptor on unmount
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Check if user has a specific role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    
    // Superuser has access to everything
    if (user.is_superuser) return true;
    
    // Check for specific role
    return user.role === requiredRole;
  };

  // Context value
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

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
