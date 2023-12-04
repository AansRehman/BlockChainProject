import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data after component mount
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('userToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };

    axios.get(`http://localhost:3001/profile`, config)
      .then(response => {
        if (response.data) {
          setUserData(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Profile</h1>
      {userData ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text">Name: {userData.name}</p>
            <p className="card-text">Email: {userData.email}</p>
            {/* Add other user details */}
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
