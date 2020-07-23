import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [authInfo, setAuthInfo] = useState({
    isAuthenticated: false,
    user: null
  });

  return (
    <AuthContext.Provider value={[authInfo, setAuthInfo]}>
      {props.children}
    </AuthContext.Provider>
  );
}