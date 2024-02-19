// ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyByaY7LlFzpJ9KOcJlMeXkWFd_lL41L8QM`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: userEmail,
          }),
        }
      );

      if (response.ok) {
        alert('Password reset email sent. Check your email for instructions.');
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <div className="mb-3">
        <label htmlFor="userEmail" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="userEmail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleForgotPassword} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reset Email'}
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
