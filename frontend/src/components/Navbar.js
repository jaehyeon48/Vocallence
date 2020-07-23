import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

import './navbar.css';

export default function Navbar(props) {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  async function handleLogout() {
    try {
      await axios('/api/auth/logout');

      setAuthInfo({
        isAuthenticated: false,
        user: null
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddNewWord() {
    props.setOpenAddWordModal(true);
  }

  const ifAuthenticatedRender = (
    <React.Fragment>
      <div id="navbar__add-new-word" onClick={handleAddNewWord}>Add Word</div>
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