import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import './login.css';

export default function Login() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const { email, password } = loginFormData;


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
    if (!isFirstSubmit && (emailErr || passwordErr)) {
      setIsSubmitDisabled(true);
    }
    else {
      setIsSubmitDisabled(false);
    }
  }, [isFirstSubmit, emailErr, passwordErr]);

  useEffect(() => {
    if (isLoginFailed) {
      setTimeout(() => {
        setIsLoginFailed(false);
      }, 3000);
    }
  }, [isLoginFailed]);

  if (authInfo.isAuthenticated) {
    return <Redirect to="/main" />
  }

  async function login(formData) {
    const { email, password } = formData;

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const reqBody = JSON.stringify({ email, password });

    try {
      const response = await axios.post('/api/auth', reqBody, config);

      if (response.status === 200) {
        setAuthInfo({
          isAuthenticated: true,
          user: response.data
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsLoginFailed(true);
      }
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isFirstSubmit) {
      setIsFirstSubmit(false);
      setIsSubmitDisabled(true);
      if (!validator.isEmail(email)) {
        setEmailErr(true);
      }
      if (!validator.isLength(password, { min: 4 })) {
        setPasswordErr(true);
      }
      else {
        await login(loginFormData);
      }
    }
    else {
      login(loginFormData);
    }
  }

  function handleChange(e) {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <React.Fragment>
      {isLoginFailed ? <div id="login-error-popup">Invalid email or password. Please Try again</div> : null}
      <div id="login-container">
        <h1 id="login-title">Login</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <div id="login-form__email-container">
            <input className={emailErr ? "form-input-error" : "form-input"} type="text" name="email" value={email} onChange={handleChange} required />
            <span className={emailErr ? "form-label-error" : "form-label"}>Email</span>
            {emailErr ? <small className="form-error-notice"> - Please enter valid email.</small> : null}
          </div>
          <div id="login-form__password-container">
            <input className={passwordErr ? "form-input-error" : "form-input"} type="password" name="password" value={password} onChange={handleChange} required />
            <span className={passwordErr ? "form-label-error" : "form-label"}>Password</span>
            {passwordErr ? <small className="form-error-notice"> - Please enter valid password (at least 8 characters).</small> : null}
          </div>
          <button id="login-form__submit-button" type="submit" disabled={isSubmitDisabled}>Login</button>
        </form>
      </div>
    </React.Fragment>

  );
}