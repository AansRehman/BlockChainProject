import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Appointment = () => {
  const [User, setUser] = useState({
    name: '',
    doctor: '',
    appointmentDate: ''
  });

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const navigate = useNavigate();

  const getUserRole = async () => {
    try {
      // Use a promise to handle the asynchronous nature of localStorage.getItem
      return new Promise((resolve) => {
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId'); // Add this line to get userId
        console.log(userRole);
        resolve(userRole);
      });
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  const getUserId = async () => {
    try {
      // Use a promise to handle the asynchronous nature of localStorage.getItem
      return new Promise((resolve) => {
        // const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId'); // Add this line to get userId
        console.log(userId);
        resolve(userId);
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
    fetchAppointments();
  }, [navigate]);


  // const fetchAppointments = () => {
  //   axios.get('http://localhost:3001/appointments')
  //     .then((response) => {
  //       setAppointments(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching appointments:', error);
  //     });
  // };


  const fetchAppointments = async () => {
    try {
      // const userRole = await getUserRole();
      const userId = localStorage.getItem('userId');
      console.log(userId)
      const userRole = localStorage.getItem('userRole');
      console.log(userRole)

      // const {userId } = await getUserId();
      console.log(userRole, userId)
      // Check if the user has the required role
      if (userRole === 'patient') {
        // Fetch only patient's appointments
        const response = await axios.get(`http://localhost:3001/userAppointments/${userId}`);
        setAppointments(response.data);
      } else if (userRole === 'admin') {
        // Fetch all appointments for admin
        const response = await axios.get('http://localhost:3001/appointments');
        setAppointments(response.data);
      } else {
        console.log('Unauthorized access to appointments');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = () => {
    axios.get('http://localhost:3001/doctors') // Adjust the endpoint based on your server implementation
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...User,
      [name]: value,
    });
  };

  const handleSchedule = () => {
    const { name, doctor, appointmentDate } = User;

    if (!name || !doctor || !appointmentDate) {
      toast.error('All fields are required', { duration: 5000 });
      return;
    }

    axios.post('http://localhost:3001/appointments', User)
      .then((response) => {
        toast.success('Appointment scheduled successfully', { duration: 5000 });
        setUser({
          name: '',
          doctor: '',
          appointmentDate: ''
        });
        fetchAppointments(); // Fetch updated appointment list from the server
      })
      .catch((error) => {
        toast.error('Appointment scheduling failed', { duration: 5000 });
        console.error('Error scheduling appointment:', error);
      });
  };

  const handleUpdate = () => {
    if (!selectedAppointment || !selectedAppointment._id) {
      console.error('Selected appointment or ID is undefined.');
      return;
    }

    axios.put(`http://localhost:3001/appointments/${selectedAppointment._id}`, User)
      .then((response) => {
        toast.success('Appointment updated successfully', { duration: 5000 });
        fetchAppointments(); // Fetch updated appointment list from the server
        setShowModal(false);
      })
      .catch((error) => {
        toast.error('Error updating appointment', { duration: 5000 });
        console.error('Error updating appointment:', error);
      });
  };

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setUser({
      name: appointment.name,
      doctor: appointment.doctor,
      appointmentDate: appointment.appointmentDate
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setShowModal(false);
    setUser({
      name: '',
      doctor: '',
      appointmentDate: ''
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/appointments/${id}`)
      .then((response) => {
        toast.success('Appointment deleted successfully', { duration: 5000 });
        fetchAppointments(); // Fetch updated appointment list from the server
      })
      .catch((error) => {
        toast.error('Error deleting appointment', { duration: 5000 });
        console.error('Error deleting appointment:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Schedule Appointment</h1>

      <form className="mb-4">
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            name='name'
            value={User.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">
            Doctor
          </label>
          <select
            className="form-select"
            id="doctor"
            onChange={handleChange}
            name='doctor'
            value={User.doctor}
          >
            {/* <option value="">Select Doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Garcia">Dr. Garcia</option> */}
            <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor.name}>
              {doctor.name}
            </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            id="appointmentDate"
            name='appointmentDate'
            value={User.appointmentDate}
            onChange={handleChange}
          />
        </div>

        <button type="button" className="btn btn-primary me-2" onClick={handleSchedule}>
          Schedule
        </button>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </form>

      <div>
        <h2>Existing Appointments</h2>
        <ul className="list-group mb-4">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="list-group-item">
              <p className="mb-1">Name: {appointment.name}</p>
              <p className="mb-1">Doctor: {appointment.doctor}</p>
              <p className="mb-1">Date: {appointment.appointmentDate}</p>
              {/* Display other appointment details */}
              <button type="button" className="btn btn-primary me-2" onClick={() => handleSelectAppointment(appointment)}>Update</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(appointment._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {showModal && selectedAppointment && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Update Appointment</h2>
            {/* Update form for selected appointment */}
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="modalPatientName" className="form-label">Patient Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="modalPatientName"
                  name='name'
                  value={User.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="modalDoctor" className="form-label">
                  Doctor
                </label>
                <select
                  className="form-select"
                  id="modalDoctor"
                  onChange={handleChange}
                  name='doctor'
                  value={User.doctor}
                >
                  {/* <option value="">Select Doctor</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                  <option value="Dr. Garcia">Dr. Garcia</option> */}
                   <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="modalAppointmentDate" className="form-label">Appointment Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="modalAppointmentDate"
                  name='appointmentDate'
                  value={User.appointmentDate}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
    
    );
};

export default Appointment;
