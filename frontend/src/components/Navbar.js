import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import './navbar.css';

export default function Navbar() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  function handleLogout() {

  }

  const ifAuthenticatedRender = (
    <React.Fragment>
      <div id="navbar__user">
        Hi,
        <span id="navbar__user__username">
          {authInfo.user}
        </span>
      </div>
      <div id="navbar__logout" onClick={handleLogout}>Log out</div>
    </React.Fragment>
  );

  const ifNotAuthenticatedRender = (
    <React.Fragment>
      <Link to="/signup" id="navbar__signup">SIGN UP</Link>
      <Link to="/login" id="navbar__login">LOGIN</Link>
    </React.Fragment>
  );

  return (
    <nav id="navbar">
      <Link to="/main" id="navbar__main-title">VOCAllence</Link>
      {authInfo.isAuthenticated ? ifAuthenticatedRender : ifNotAuthenticatedRender}
    </nav>
  );
}