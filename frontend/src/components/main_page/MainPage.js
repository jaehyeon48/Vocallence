import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import WordCount from './WordCount';
import WordMeaning from './WordMeaning';
import ShowPrevWord from './ShowPrevWord';
import ShowNextWord from './ShowNextWord';
import Examples from './Examples';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

import { AuthContext } from '../../context/AuthContext';

export default function MainPage() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

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
  }, []);

  if (!authInfo.isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div id="main-container">
      <WordCount />
      <WordMeaning />
      <ShowPrevWord />
      <ShowNextWord />
      <Examples />
      <EditButton />
      <DeleteButton />
    </div>
  );
}
