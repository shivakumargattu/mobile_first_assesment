import React, { useState, useEffect } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);

    // If there are no errors, call onLogin
    if (Object.keys(errors).length === 0) {
      onLogin(formData);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      const response = await fetch(
        'https://sv443.net/jokeapi/v2/joke/Miscellaneous?type=twopart&amount=10'
      );
      const data = await response.json();
      setJokes(data.jokes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  return (
    <div>
      <h1>Jokes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="jokes-container">
          {jokes.map((joke, index) => (
            <div key={index} className="joke">
              <p className="setup">{joke.setup}</p>
              <p className="delivery">{joke.delivery}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (formData) => {
    // Simulating authentication with fake credentials
    if (formData.email === formData.email && formData.password === formData.password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Jokes />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
