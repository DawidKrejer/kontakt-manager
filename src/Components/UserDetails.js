import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDetails() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://localhost:44324/api/user');
        setUser(response.data);
      } catch (error) {
        console.error('Błąd pobierania użytkownika:', error.response.data);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <p>Zalogowany użytkownik: {user.Email}</p>
      ) : (
        <p>Nie jesteś zalogowany</p>
      )
}
    </div>
  )
}
export default UserDetails;
