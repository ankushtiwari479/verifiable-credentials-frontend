import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerifiableCredentialForm from './VerifiableCredentialForm/VerifiableCredentialForm';
import StudentSignup from './StudentSignup/StudentSignup';
import StudentLogin from './StudentLogin/StudentLogin';
import AdminLogin from './AdminLogin/AdminLogin';
import VerifyDocument from './VerifyDocument/VerifyDocument';
import Navbar from './Navbar/Navbar';
import './App.css'
import StudentHome from './StudentHome/StudentHome';
import { setAuthToken } from './axios';

function App() {
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      setAuthToken(token)
    }
  },[])
  return (
    <div>
      <Navbar/>
    <Router>
      <div className="App">
      <Routes>
          {/* Student Routes */}
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/" element={<StudentSignup />} />
          <Route path="/student/login" element={<StudentLogin />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Verification Route */}
          <Route path="/verifydoc/:id" element={<VerifyDocument />} />

          {/* Default Route */}
          {/* <Route path="/" element={<VerifiableCredentialForm />} /> */}
          <Route path="/student/home" element={<StudentHome />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
