import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      fetchUserProfile(token);
    }

    // Add an event listener to listen for 'tokenUpdated' event
    window.addEventListener('tokenUpdated', () => {
      const updatedToken = localStorage.getItem('userToken');
      if (updatedToken) {
        fetchUserProfile(updatedToken);
      }
    });
  }, []);

  const fetchUserProfile = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get('http://localhost:3001/profile', config);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Healthcare System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item">
                <span className="nav-link">{`Welcome, ${user.name}`}</span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          <li className="nav-item">
              <Link className="nav-link" to="/patients">Patients</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">Reports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/appointments">Appointments</Link>
            </li> 
            <li className="nav-item">
              <Link className="nav-link" to="/prescription">Prescription</Link>
            </li>  
            <li className="nav-item">
              <Link className="nav-link" to="/doctor">Doctor</Link>
            </li>    <li className="nav-item">
            <Link className="nav-link" to="/Report">Report Upload</Link>
            </li>   
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
