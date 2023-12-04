import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const DoctorPageComponent = () => {
  
  const navigate = useNavigate();

  const getUserRole = async () => {
    try {
      // Use a promise to handle the asynchronous nature of localStorage.getItem
      return new Promise((resolve) => {
        const userRole = localStorage.getItem('userRole');
        console.log(userRole);
        resolve(userRole);
      });
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await getUserRole();

      // Check if the user has the required role
      if (userRole !== 'doctor' && userRole !== 'admin') {
        // Display unauthorized access message
        console.log('Unauthorized access to DoctorPageComponent');

        // Redirect to login page after a delay (you can adjust the delay as needed)
        setTimeout(() => {
          navigate('/login');
        }, 1000); // Redirect after 1 seconds
      }
    };

    fetchUserRole();
  }, [navigate]);
  

  const [data, setData] = useState({
    name: '',
    age: '',
    tests: [], // Store selected tests in an array
    prescription: ''
  });

  const testsList = [
    'Complete Blood Count (CBC)',
    'Lipid Profile Test',
    'Liver Function Tests (LFTs)',
    'Thyroid Function Tests (TFTs)',
    'Electrocardiogram (ECG)',
    'Urine Test'
    // Add more tests as needed
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox (tests), handle multiple selections
    if (type === 'checkbox') {
      const updatedTests = checked
        ? [...data.tests, value] // Add the test to the array
        : data.tests.filter((test) => test !== value); // Remove the test from the array
      setData({ ...data, tests: updatedTests });
    } else {
      // For other inputs (name, age, prescription)
      setData({
        ...data,
        [name]: value
      });
    }
  };  
  const handleSubmit = () => {
    console.log(data); // Make sure data holds the required information before the API call
  
    if (!data) {
      toast.error('All fields are required', { duration: 5000 });
      return;
    }
    // Make an API call using Axios
    axios.post('http://localhost:3001/doctor', data)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        toast.success('Submitted successfully', { duration: 5000 });
        setData({
          name: '',
          age: '',
          tests: [],
          prescription: ''
        });
        // Handle any further actions after successful submission
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        // Handle error scenarios here
      });
  };
  

  return (
    <div className="container mt-4">
      <h2>Doctor Page</h2>
      <div className="mb-3">
        <h3>Patient Information</h3>
        <label className="form-label">Patient Name:</label>
        <input
          type="text"
          name='name'
          className="form-control"
          value={data.name}
          onChange={handleChange}
        />
        <label className="form-label">Age:</label>
        <input
          type="text"
          name='age'
          className="form-control"
          value={data.age}
          onChange={handleChange}
        />
        {/* Add more input fields for other patient details */}
      </div>

      <label>Select Tests:</label>
      <br />
      {testsList.map((test, index) => (
        <div key={index} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="tests"
            id={`test-${index}`}
            value={test}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={`test-${index}`}>
            {test}
          </label>
        </div>
      ))}

      <div className="mb-3">
        <h3>Add Prescription</h3>
        <textarea
          className="form-control"
          value={data.prescription}
          name='prescription'
          onChange={handleChange}
          placeholder="Enter prescription details"
          // rows={4}
        ></textarea>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default DoctorPageComponent;
