import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css'; 

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    createPassword: '',
    reenterPassword: '',
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
      window.alert("LOGIN SUCCESS!!");
    }
  };
  

  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <div className="login-box1">
          <h2 style={{ color: 'white' }}>Sign Up</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" style={{ color: 'white' }}>
                <h4>Name:</h4>
              </label>
              <input type="text" id="name" placeholder="Enter your Name" onChange={handleChange} />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{ color: 'white' }}>
                <h4>Email:</h4>
              </label>
              <input type="email" id="email" placeholder="Enter your Email" onChange={handleChange} />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="mobile" style={{ color: 'white' }}>
                <h4>Mobile Number:</h4>
              </label>
              <input type="tel" id="mobile" placeholder="Enter your Mobile Number" onChange={handleChange} />
              {errors.mobile && <p>{errors.mobile}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="createPassword" style={{ color: 'white' }}>
                <h4>Create Password:</h4>
              </label>
              <input type="password" id="createPassword" placeholder="Create a Password" onChange={handleChange} />
              {errors.createPassword && <p>{errors.createPassword}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="reenterPassword" style={{ color: 'white' }}>
                <h4>Re-enter Password:</h4>
              </label>
              <input type="password" id="reenterPassword" placeholder="Re-enter Password" onChange={handleChange} />
              {errors.reenterPassword && <p>{errors.reenterPassword}</p>}
            </div>
            <button className="btn btn-primary">Sign Up</button>
          </form>
          <p style={{ color: 'white' }}>
            Already have an account?{' '}
            <Link to="/patient-login" style={{ color: 'white' }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function validate(form) {
  let errors = {};

  // Email validation
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/;
  if (!emailRegex.test(form.email)) {
    errors.email = "Email is incorrect!";
  }

  // Password validation
  const pass = form.createPassword;
  const len = pass.length;
  const symb = /[@\#\$%\^&\*()!\.<>]+/;
  const caps = /[A-Z]+/;
  const digit = /[0-9]+/;

  if (len < 8 || len > 15) {
    errors.createPassword = "Password length should be between 8 and 15 characters.";
  } else if (!symb.test(pass)) {
    errors.createPassword = "Password should contain at least one special character.";
  } else if (!caps.test(pass)) {
    errors.createPassword = "Password should contain at least one capital letter.";
  } else if (!digit.test(pass)) {
    errors.createPassword = "Password should contain at least one digit.";
  }

  // Password match validation
  if (form.createPassword !== form.reenterPassword) {
    errors.reenterPassword = "Passwords do not match.";
  }

  return errors;
}

export default Signup;
