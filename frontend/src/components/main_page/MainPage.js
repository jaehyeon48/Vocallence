import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import WordCount from './WordCount';
import WordMeaning from './WordMeaning';
import ShowPrevWord from './ShowPrevWord';
import ShowNextWord from './ShowNextWord';
import Examples from './Examples';

import './mainPage.css';

import { AuthContext } from '../../context/AuthContext';

export default function MainPage() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);
  const [wordList, setWordList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadWordList();
      setWordList(shuffleList(wordList));
    }
    return () => isMounted = false;
  }, []);

  async function loadWordList() {
    try {
      const response = await axios.get('/api/word');
      if (response.status === 200) {
        setWordList(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  if (!authInfo.isAuthenticated) {
    return <Redirect to="/login" />
  }

  function handleShuffle() {
    setCurrentWordIndex(0);
    setWordList(shuffleList(wordList));
  }

  return (
    <div id="main-container">
      <WordCount currentIndex={currentWordIndex} listLength={wordList.length} />
      <WordMeaning wordList={wordList} currentIndex={currentWordIndex} />
      <Examples wordList={wordList} currentIndex={currentWordIndex} />
      <ShowPrevWord currentIndex={currentWordIndex} setWordIndex={setCurrentWordIndex} />
      <ShowNextWord currentIndex={currentWordIndex} setWordIndex={setCurrentWordIndex} listLength={wordList.length} />
      <div id="main-container__buttons-container">
        <button id="buttons-container__edit-button" type="button">EDIT</button>
        <button id="buttons-container__delete-button" type="button">DELETE</button>
        <button id="buttons-container__shuffle-button" type="button" onClick={handleShuffle}>SHUFFLE!</button>
      </div>
    </div>
  );
}

function shuffleList(wordList) {
  let list = [...wordList];
  let currentIndex = list.length
  let temporaryValue
  let randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = list[currentIndex];
    list[currentIndex] = list[randomIndex];
    list[randomIndex] = temporaryValue;
  }

  return list;
}