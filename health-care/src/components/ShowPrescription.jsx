// PrescriptionList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch prescriptions from the server
    const fetchPrescriptions = async () => {
      try {

        const userId = localStorage.getItem('userId');
        console.log(userId)
        const userRole = localStorage.getItem('userRole');
        console.log(userRole)

        // const {userId } = await getUserId();
        console.log(userRole, userId)
        // Check if the user has the required role
        if (userRole === 'patient') {
            // Fetch only patient's appointments
            const response = await axios.get(`http://localhost:3001/getPrescription/${userId}`);
            setPrescriptions(response.data);
        } else if (userRole === 'admin') {
            // Fetch all appointments for admin
            const response = await axios.get('http://localhost:3001/getPrescription');
            setPrescriptions(response.data);
        } else {
            console.log('Unauthorized access to appointments');
        }

        // const response = await axios.get('http://localhost:3001/getPrescription');
        // setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Prescription List</h2>
      <div className="row">
        {prescriptions.map((prescription) => (
          <div key={prescription._id} className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{prescription.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {prescription.age} years
                </Card.Subtitle>
                <Card.Text>
                  Tests: {prescription.tests.join(', ')}
                </Card.Text>
                <Card.Text>
                  Prescription: {prescription.prescription}
                </Card.Text>
                <Card.Text>
                  Date: {prescription.date}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionList;
