import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

export default function SignUp() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  if (authInfo.isAuthenticated) {
    <Redirect to="/main" />
  }
  return (
    <div>

    </div>
  );
}