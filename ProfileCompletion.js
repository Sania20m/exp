import React, { useState } from 'react';
import axios from 'axios';

const ProfileCompletion = ({ onUpdateProfile }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileComplete, setProfileComplete] = useState(false);
  const [idToken, setIdToken] = useState('');

  const handleUpdateProfile = async () => {
    // if (!fullName || !address || !phoneNumber || !idToken) {
    //     alert('All fields are mandatory');
    //     return;
    // }
    try {
      // Define the data to be sent in the request
      const userData = {
       idToken: idToken,
        displayName: fullName,
        photoUrl: '', // You can include a photoUrl if needed
        returnSecureToken: true,
      };
      
      // Make the POST request to update the user profile
      const response = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyByaY7LlFzpJ9KOcJlMeXkWFd_lL41L8QM',
          userData
          );
          
          // Check if the update was successful
          if (response.data && response.data.displayName) {
            console.log('User profile updated successfully');
            setProfileComplete(true);
            onUpdateProfile();
          } else {
            console.error('Failed to update user profile - Invalid response:', response.data);
          }
        } catch (error) {
          console.error('Error updating user profile:', error.response.data);
        }
      };
    

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Complete Your Profile</h2>
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address:
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number:
        </label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateProfile}>
        Update Profile
      </button>
      {profileComplete && <p className="text-success mt-3">Profile is 100% completed!</p>}
    </div>
  );
};

export default ProfileCompletion;