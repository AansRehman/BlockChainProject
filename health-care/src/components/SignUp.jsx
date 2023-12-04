import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
// import User from '../../../Server/Models/User';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const navigate=useNavigate();
  const [User, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age:'',
    role:''
    
    //  gender:'' 
  })
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [gender, setGender] = useState(''); // State for gender selection


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...User,
      [name]: value,
    });


    console.log(User)
    // console.log(User)



  }

  const Register = () => {
    const { name, email, password,  confirmPassword, gender,age, role } = User;

    // Basic validations
    if (!name || !email || !password || !confirmPassword || !gender,!age || !role) {
      toast.error('All fields are required', { duration: 5000 });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { duration: 5000 });
      return;
    }

    // Additional email validation (you can use a library like validator.js for more robust validation)
    if (!isValidEmail(email)) {
      toast.error('Invalid email address', { duration: 5000 });
      return;
    }

    else{
    // If all validations pass, make the Axios POST request
    axios
      .post('http://localhost:3001/register', User)
      .then((response) => {
        toast.success('Registration successful', { duration: 5000 });
        navigate('/login')
        console.log(response.data);
      })
      .catch((error) => {
        toast.error('Registration failed', { duration: 5000 });
        console.log(error);
      });
    }
  };

  // Function to validate email using a simple regex
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }


  return (

    <div className="container mt-4">
      <h2>Sign Up</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={User.name}
            name='name'
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="useremail"
            value={User.email}
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Age</label>
          <input
            type='number'
            className="form-control"
            id="userage"
            value={User.age}
            name='age'
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={User.password}
            name='password'

            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"

            value={User.confirmPassword}
            name='confirmPassword'
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Gender:</label>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
          </div>
          <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          className="form-select"
          id="role"
          value={User.role}
          name="role"
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={Register}>Sign Up</button>

      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <Toaster position="top-right" reverseOrder={false} />


    </div>
  );
};

export default Signup;
