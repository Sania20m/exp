import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onAuthentication }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        setError('All fields are mandatory');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByaY7LlFzpJ9KOcJlMeXkWFd_lL41L8QM`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      if (response.data && response.data.idToken) {
        console.log('User has successfully signed up');
        onAuthentication(true);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      setError(err.response.data.error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Signup</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSignup}>
        Sign Up
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default Signup;