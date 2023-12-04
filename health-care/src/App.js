import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReportUpload from './components/ReportUpload';
import Home from './components/Home';
import Appointment from './components/Appointment';
import ProfilePage from './components/profile';
import DoctorPageComponent from './components/DoctorPageComponent';
import PatientComponent from './components/Patents';
import PatientReports from './components/PatientReports';
import ShowPrescription from './components/ShowPrescription'

const isAuthenticated = () => {
  // Your authentication logic here
  const userToken = localStorage.getItem('userToken'); // Retrieve user token from localStorage
  return !!userToken; // Return true if the user token exists, otherwise false
};

// Retrieve the user role from your authentication logic or user token
const getUserRole = () => {
  // Implement your logic to retrieve the user's role
  const userRole = localStorage.getItem('userRole'); // For example, retrieve user role from localStorage
  return userRole;
};

const App = () => {
  const PrivateRoute = ({ path, element, allowedRoles }) => {
    const userRole = getUserRole();
    const isAuthorized = isAuthenticated() && allowedRoles.includes(userRole);

    return isAuthenticated() ? (
      <Route path={path} element={element} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <BrowserRouter>
   < Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        {/* Protected routes - Require login */}
        {/* <Route
          path="/report"
          element={isAuthenticated() ? <ReportUpload /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/appointments"
          element={isAuthenticated() ? <Appointment /> : <Navigate to="/login" replace />}
        /> */}

        <Route
          path="/profile"
          element={isAuthenticated() ? <ProfilePage/> : <Navigate to="/login" replace />}
        />
        
        {/* <Route
          path="/doctor"
          element={isAuthenticated() ? <DoctorPageComponent/> : <Navigate to="/login" replace />}
        />
         <Route
          path="/patients"
          element={isAuthenticated() ? <PatientComponent/> : <Navigate to="/login" replace />}
        /> */}
        
        <Route path="/report" element={<ReportUpload />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/doctor" element={<DoctorPageComponent />} />
        <Route path="/patients" element={<PatientComponent />} />
        <Route path="/reports" element={<PatientReports />} />
        <Route path="/prescription" element={<ShowPrescription />} />

        {/* Add more protected routes as needed */}
        {/* NoPage route when no matching route is found */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

