import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Changed from 'authToken'
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Changed from 'authToken'
        }
      });
      const data = await response.json();
      if (data.success) setUser(data.data);
    } catch (error) {
      console.error('Auth error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Changed from 'authToken'
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return { user, loading, logout, fetchUser };
};