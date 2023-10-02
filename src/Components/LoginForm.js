import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get("https://localhost:44324/api/user");
        if (response.status === 200) {
          setLoggedInUser(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:44324/api/login", {
        email,
        password,
      });

      if (response.status === 200) {

        const userResponse = await axios.get("https://localhost:44324/api/user");
        if (userResponse.status === 200) {
          const user = userResponse.data;
          setLoggedInUser(user);
        }

        window.location.href = "/dashboard"; 
        setError("Nieprawidłowy email lub hasło. Sprawdź swoje dane logowania.");
      }
    } catch (err) {
      setError("Wystąpił błąd podczas logowania. Sprawdź swoje dane logowania.");
    }
  };

  return (
    <div className="login-form">
      <h2>Logowanie</h2>
      {loggedInUser ? (
        <div>
          <p>Zalogowany użytkownik: {loggedInUser}</p>
          <button className="btn btn-primary" onClick={() => setLoggedInUser(null)}>
            Wyloguj się
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Hasło:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Zaloguj się
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
