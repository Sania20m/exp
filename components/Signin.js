// src/components/Signin.js
import React, { useState } from 'react';
import axios from 'axios';

const Signin = ({onAuthentication}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        setError('All fields are mandatory');
        return;
      }

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByaY7LlFzpJ9KOcJlMeXkWFd_lL41L8QM`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      // Check for successful signin
      if (response.data && response.data.idToken) {
        console.log('User has successfully signed in');
        onAuthentication(true)
      } else {
        setError('Signin failed. Please check your email and password.');
      }
    } catch (err) {
      setError(err.response.data.error.message);
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign In</h2>
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
      <button className="btn btn-primary" onClick={handleSignIn}>
        Sign In
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};


export default Signin;