import React from 'react';
import axios from 'axios';

function LogoutButton({ onLogout }) {
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      onLogout();
    } catch (error) {
      console.error('Błąd wylogowania:', error.response.data);
    }
  };

  return (
    <button onClick={handleLogout}>Wyloguj</button>
  );
}

export default LogoutButton;
