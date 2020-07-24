import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import './signup.css';

export default function SignUp() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);
  const [signupFormData, setSignupFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const { firstName, lastName, email, password } = signupFormData;

  useEffect(() => {
    if (!isFirstSubmit && firstName.trim() === '') {
      setFirstNameErr(true);
    }
    else if (!isFirstSubmit && firstName.trim() !== '') {
      setFirstNameErr(false);
    }
  }, [isFirstSubmit, firstNameErr, firstName]);


  useEffect(() => {
    if (!isFirstSubmit && lastName.trim() === '') {
      setLastNameErr(true);
    }
    else if (!isFirstSubmit && lastName.trim() !== '') {
      setLastNameErr(false);
    }
  }, [isFirstSubmit, lastNameErr, lastName]);


  useEffect(() => {
    if (!isFirstSubmit && !validator.isEmail(email)) {
      setEmailErr(true);
    }
    else if (!isFirstSubmit && validator.isEmail(email)) {
      setEmailErr(false);
    }
  }, [isFirstSubmit, emailErr, email]);


  useEffect(() => {
    if (!isFirstSubmit && !validator.isLength(password, { min: 4 })) {
      setPasswordErr(true);
    }
    else if (!isFirstSubmit && validator.isLength(password, { min: 4 })) {
      setPasswordErr(false);
    }
  }, [isFirstSubmit, passwordErr, password]);


  useEffect(() => {
    if (!isFirstSubmit && (firstNameErr || lastNameErr || emailErr || passwordErr)) {
      setIsSubmitDisabled(true);
    }
    else {
      setIsSubmitDisabled(false);
    }
  }, [isFirstSubmit, firstNameErr, lastNameErr, emailErr, passwordErr]);

  if (authInfo.isAuthenticated) {
    return <Redirect to="/main" />
  }

  async function signUp(formData) {
    const { firstName, lastName, email, password } = formData;

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const reqBody = JSON.stringify({ firstName, lastName, email, password });

    try {
      const response = await axios.post('/api/auth/signup', reqBody, config);

      if (response.status === 200) {
        setAuthInfo({
          isAuthenticated: true,
          user: response.data
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (isFirstSubmit) {
      setIsFirstSubmit(false);
      setIsSubmitDisabled(true);
      if (firstName.trim() === '') {
        setFirstNameErr(true);
      }
      if (lastName.trim() === '') {
        setLastNameErr(true);
      }
      if (!validator.isEmail(email)) {
        setEmailErr(true);
      }
      if (!validator.isLength(password, { min: 4 })) {
        setPasswordErr(true);
      }
      else {
        await signUp(signupFormData);
      }
    }
    else {
      signUp(signupFormData);
    }
  }

  function handleChange(e) {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div id="signup-container">
      <h1 id="signup-title">Sign Up</h1>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div id="signup-form__firstname-container">
          <input className={firstNameErr ? "form-input-error" : "form-input"} type="text" name="firstName" value={firstName} onChange={handleChange} required />
          <span className={firstNameErr ? "form-label-error" : "form-label"}>First Name</span>
          {firstNameErr ? <small className="form-error-notice"> - Please enter valid firstname.</small> : null}
        </div>
        <div id="signup-form__lastname-container">
          <input className={lastNameErr ? "form-input-error" : "form-input"} type="text" name="lastName" value={lastName} onChange={handleChange} required />
          <span className={lastNameErr ? "form-label-error" : "form-label"}>Last Name</span>
          {lastNameErr ? <small className="form-error-notice"> - Please enter valid lastname.</small> : null}
        </div>
        <div id="signup-form__email-container">
          <input className={emailErr ? "form-input-error" : "form-input"} type="text" name="email" value={email} onChange={handleChange} required />
          <span className={emailErr ? "form-label-error" : "form-label"}>Email</span>
          {emailErr ? <small className="form-error-notice"> - Please enter valid email.</small> : null}
        </div>
        <div id="signup-form__password-container">
          <input className={passwordErr ? "form-input-error" : "form-input"} type="password" name="password" value={password} onChange={handleChange} required />
          <span className={passwordErr ? "form-label-error" : "form-label"}>Password</span>
          {passwordErr ? <small className="form-error-notice"> - Please enter valid password (at least 8 characters).</small> : null}
        </div>
        <button id="signup-form__submit-button" type="submit" disabled={isSubmitDisabled}>Sign Up</button>
      </form>
    </div>
  );
}