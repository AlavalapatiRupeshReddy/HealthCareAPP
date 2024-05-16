import React, { useState } from 'react';
import './DoctorPage.css'; 

function DoctorLogin() {
  const [form, setForm] = useState({
    doctorID: '',
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
      window.location.href = '/Doctor'; // Redirect to Doctor page
    }
  };

  return (
    <div className="doctor-page">
      <div className="doctor-login-container">
        <div className="login-box">
          <h2 style={{ color: 'white' }}>Doctor Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="doctorID" style={{ color: 'white' }}>
                <h4>Doctor ID:</h4>
              </label>
              <input type="text" id="doctorID" placeholder="Enter your Doctor ID" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ color: 'white' }}>
                <h4>Password:</h4>
              </label>
              <input type="password" id="password" placeholder="Enter your Password" onChange={handleChange} />
            </div>
            <button className="btn btn-primary" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function validate(form) {
  let errors = {};

  // Doctor ID validation
  const doctorIDRegex = /^[0-9]{9}$/;
  if (!doctorIDRegex.test(form.doctorID)) {
    errors.doctorID = "Doctor ID should be exactly 9 digits.";
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

export default DoctorLogin;
