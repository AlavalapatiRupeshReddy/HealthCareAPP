import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PatientPage.css'; 

function PatientLogin() {
  const [form, setForm] = useState({
    patientID: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      let errorMessage = '';
      for (const error in newErrors) {
        errorMessage += newErrors[error] + '\n';
      }
      window.alert(errorMessage);
    } else {
      // Navigate programmatically
      window.location.href = '/Patient'; // Redirect to Patient page
    }
  };
  
  return (
    <div className="patient-page">
      <div className="patient-login-container">
        <div className="login-box">
          <h2 style={{ color: 'white' }}>Patient Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="patientID" style={{ color: 'white' }}>
                <h4>Patient ID:</h4>
              </label>
              <input type="text" id="patientID" placeholder="Enter your Patient ID" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ color: 'white' }}>
                <h4>Password:</h4>
              </label>
              <input type="password" id="password" placeholder="Enter your Password" onChange={handleChange} />
            </div>
            <button className="btn btn-secondary" type="submit">Login</button>
          </form>
          <p style={{ color: 'white' }}>
            Don't have an account?{' '}
            <Link to="/Signup" style={{ color: 'white' }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function validate(form) {
  let errors = {};

  // Patient ID validation
  const patientIDRegex = /^[0-9]{9}$/;
  if (!patientIDRegex.test(form.patientID)) {
    errors.patientID = "Patient ID should be exactly 9 digits.";
  }

  // Password validation
  const pass = form.password;
  const len = pass.length;
  const symb = /[@#$%^&*().<>]+/;
  const caps = /[A-Z]+/;
  const digit = /[0-9]+/;

  if (len < 8 || len > 15) {
    errors.password = "Password length should be between 8 and 15 characters.";
  } else if (!symb.test(pass)) {
    errors.password = "Password should contain at least one special character.";
  } else if (!caps.test(pass)) {
    errors.password = "Password should contain at least one capital letter.";
  } else if (!digit.test(pass)) {
    errors.password = "Password should contain at least one digit.";
  }

  return errors;
}

export default PatientLogin;
