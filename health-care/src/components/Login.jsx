import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
// Assuming you're using React Router
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();
  const [user,setUser]=useState({
    email:'',
    password:''
})

const handleChange=e=>{

const  {name,value}=e.target;

setUser({
...user,
[name]:value

})
console.log(user)


}


const login = () => {
  axios
    .post('http://localhost:3001/login', user)
    .then((response) => {
      // const { userId } = response.data; 
      // const { token } = response.data;
      const { message, role, token, id } = response.data;

      // Assuming your backend sends the userId in response.data
      console.log(response.data)

      if (message) {
        // localStorage.setItem('userId', userId); // Store the userId in localStorage
        // localStorage.setItem('userId', userId);
        localStorage.setItem('userToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('userRole', role); // Store the user role in localStorage
        
        console.log('Stored userId:', localStorage.getItem('userId'), localStorage.getItem('userRole'), role, localStorage.getItem('userId'));
      }
    
      localStorage.setItem('userToken',token);

      toast.success('Login successful', { duration: 5000 });
      
      navigate('/profile');
    })
    .catch((error) => {
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error('Login failed: Server error', { duration: 5000 });
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error('Login failed: No response from server', { duration: 5000 });
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message);
        toast.error('Login failed: Request setup error', { duration: 5000 });
      }
      console.log(error.config);
    });
};

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="userEmail"  className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="useremail"
            name="email" value={user.email}
            onChange={handleChange}
          />


        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name='password' value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={login}>Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default Login;
