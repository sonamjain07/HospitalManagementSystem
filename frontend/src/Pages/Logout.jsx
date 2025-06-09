import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem('token');

        // Optional backend call to logout (use only if backend manages sessions)
        await axios.post('http://localhost:5500/api/patient/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Clear client-side data
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        alert('Logged out successfully');
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        navigate('/login');
      }
    };

    logout();
  }, [navigate]);

  return null;
}
