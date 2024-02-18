import React, { useState } from 'react';
import Signin from './components/Signin';
import Signup from './components/SignUp';
import './App.css';
import ProfileCompletion from './components/ProfileCompletion';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
    setShowProfileCompletion(!status);
  };


  const handleToggle = () => {
    setShowSignup(!showSignup);
  };

  const handleCompleteProfile = () => {
    setShowProfileCompletion(true);
  };
  const handleVerifyEmail = async () => {
    try {
      const idToken = localStorage.getItem('token');

      if (!idToken) {
        console.error('Token not found. Please sign in again.');
        return;
      }

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyByaY7LlFzpJ9KOcJlMeXkWFd_lL41L8QM`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken,
          }),
        }
      );

      if (response.ok) {
        alert('Check your email for a verification link.');
      } else {
        console.error('Error sending email verification:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending email verification:', error.message);
    }
  };


  return (
    <div className="container mt-5">
    {isAuthenticated ? (
      <div>
        <h1>Welcome To Expense Tracker</h1>
        {showProfileCompletion ? (
          <ProfileCompletion onUpdateProfile={() => setShowProfileCompletion(false)} />
        ) : (
          <div>
          <p className="text-info">
            Your profile is incomplete.{' '}
            <button className="btn-link" onClick={handleCompleteProfile}>
              Complete it now.
            </button>
          </p>
          <p className="text-info">
          Your email is not verified.{' '}
          <button className="btn-link" onClick={handleVerifyEmail}>
            Verify it now.
          </button>
        </p>
        </div>
        )}
      </div>
    ) : (
      <div>
        {showSignup ? (
          <Signup onAuthentication={handleAuthentication} />
        ) : (
          <div>
            <Signin onAuthentication={handleAuthentication} />
            {showProfileCompletion && (
              <button className="btn btn-primary mt-3" onClick={handleCompleteProfile}>
                Complete Profile
              </button>
            )}
          </div>
        )}
        <button className="btn btn-link mt-3" onClick={handleToggle}>
          {showSignup ? 'Switch to Sign In' : 'Switch to Sign Up'}
        </button>
      </div>
    )}
  </div>
);
}

export default App;
