import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import './landing.css';

export default function Landing() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  if (authInfo.isAuthenticated) {
    return <Redirect to="/main" />
  }
  return (
    <div id="landing-page-container">
      <div id="landing-page-content">
        <header id="landing-page-header">
          <h1>Build your vocabulary strength with <span id="landing-page-header-highlight">VOCAllence</span>!</h1>
        </header>
      </div>
    </div>
  );
}