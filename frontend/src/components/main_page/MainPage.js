import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

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
