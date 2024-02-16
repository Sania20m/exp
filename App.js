import React,{useState} from 'react';
import Signin from './components/Signin';
import Signup from './components/SignUp';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };
  const handleToggle = () => {
    setShowSignup(!showSignup);
  };


  return (
    
     <div className="container mt-5">
      {isAuthenticated ? (
        <p>User is authenticated</p>
      ) : (
        <div>
          {showSignup ? (
            <Signup onAuthentication={handleAuthentication} />
          ) : (
            <Signin onAuthentication={handleAuthentication} />
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
