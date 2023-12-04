import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

const ReportUpload = () => {
  const [patientName, setPatientName] = useState('');
  const [reportFile, setReportFile] = useState(null);

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

      console.log(userRole)
      // Check if the user has the required role
      if (userRole !== 'patient' && userRole !== 'admin') {
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

  const handleFileChange = (e) => {
    // Update state with the selected file
    setReportFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (reportFile) {
      const formData = new FormData();
      formData.append('patientName', patientName);
      formData.append('reportFile', reportFile);
      console.log(formData)
  
      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Upload successful:', data);
        toast.success('Upload successful', { duration: 5000 });
    //     setPatientName('');
    // setReportFile('');

          
          // Optionally, perform actions after successful upload
        })
        .catch(error => {
          console.error('Error uploading report:', error);
        toast.error('Upload failed', { duration: 5000 });

          // Handle errors during upload
        });
    } else {
      console.log('Please select a file to upload.');
      toast.error('Please select a file to upload.', { duration: 5000 });

    }
    
  };
  

  return (
    <div className="container mt-4">
      <h2>Upload Patient Report</h2>
      <div className="mb-3">
        <label htmlFor="patientName" className="form-label">Patient Name</label>
        <input
          type="text"
          className="form-control"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reportFile" className="form-label">Choose Report File</label>
        <input
          type="file"
          className="form-control"
          id="reportFile"
          accept=".pdf,.doc,.docx" // Acceptable file formats
          onChange={handleFileChange}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleUpload}>Upload Report</button>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default ReportUpload;
