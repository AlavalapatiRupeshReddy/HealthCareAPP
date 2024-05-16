import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="content">
        <div className="right-content">
          <div className="description">
            <div className="welcome">
              <h1 className="display-4">Welcome to our Smart Patient Health Monitoring Page!</h1>
            </div>
            <p>
              Our platform bridges the gap between patients and doctors, providing seamless communication and care.
              Patients can securely log in to monitor their health values, while doctors can access real-time data to provide personalized prescriptions.
              Experience the future of healthcare with us!
            </p>
          </div>
          <div className="doctor-info">
            
          </div>
        </div>
        <div className="login-buttons">
          <Link to="/patient-login" className="btn btn-secondary">
            Patient Login
          </Link>
          <Link to="/Doctor-login" className="btn btn-secondary">
            Doctor Login
          </Link>
          <a href="/Contact" >Contact Us</a>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
