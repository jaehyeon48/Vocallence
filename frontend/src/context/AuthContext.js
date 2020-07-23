import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [authInfo, setAuthInfo] = useState({
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    async function checkingAuthStatus() {
      try {
        const response = await axios.get('/api/auth');
        if (response.status === 200) {
          setAuthInfo({
            isAuthenticated: true,
            user: response.data.firstName
          })
        }
      } catch (error) {
        console.error(error.response);
      }
    }
    checkingAuthStatus();
  });

  return (
    <AuthContext.Provider value={[authInfo, setAuthInfo]}>
      {props.children}
    </AuthContext.Provider>
  );
}