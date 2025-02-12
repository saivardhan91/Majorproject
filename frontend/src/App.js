import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./routes/AuthContex";
import Register from "./Landingpage";
import Login from "./Login/Login";
import ReligionDetailsForm from './RegisterForms/ReligionDetailsForm';
import RegisterPersonalDetail from "./RegisterForms/RegisterPersonalDetail";
import ProfessionalDetailsForm from "./RegisterForms/ProfessionalDetails";
import Photodetails from './RegisterForms/Photodetails';
import HomePage from "./HomePage/Home";
import Profile from "./HomePage/profile";
import Matches from './HomePage/Matches';
import Search from './HomePage/Search';
import ShortList from './HomePage/ShortList';
import NotificationCard from "./HomePage/Notification";
import MyProfile from './HomePage/MyProfile'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AppContent() {
  return (
    <AuthProvider>
      <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          {/* Redirect to Register by default */}
          <Route path="/" element={<Navigate to="/register" />} />

          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/ReligionDetails" element={<ReligionDetailsForm />} />
          <Route path="/register/RegisterPersonalDetails" element={<RegisterPersonalDetail />} />
          <Route path="/register/ProfessionalDetails" element={<ProfessionalDetailsForm />} />
          <Route path="/register/PhotoDetails" element={<Photodetails />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Matches' element={<Matches/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Favorites' element={<ShortList/>}/>
          <Route path='/Notification' element={<NotificationCard/>}/>
          <Route path='/MyProfile' element={<MyProfile/>}/>
          {/* Add Protected Routes Here */}
        </Routes>
      </div>
    </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
