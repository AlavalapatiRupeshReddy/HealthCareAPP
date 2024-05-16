import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import LandingPage from './LandingPage';
import PatientLogin from './PatientLogin';
import Signup from './Signup';
import DoctorLogin from './DoctorLogin';
import PatientInfo from './Patient';
import ContactUs from './Contact';
import doctor from './Doctor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage/>} />
        <Route path="/patient-login" element={<PatientLogin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/Doctor-login" element={<DoctorLogin/>} />
        <Route path="/Patient" element={<PatientInfo/>} />
        <Route path="/Contact" element={<ContactUs/>} />
        <Route path="/Doctor" element={<doctor/> } />
        </Routes>
    </Router>
  );
}
export default App;
