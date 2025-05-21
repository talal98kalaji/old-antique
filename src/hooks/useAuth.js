import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    axios.get('http://127.0.0.1:8000/api/auth/user/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
