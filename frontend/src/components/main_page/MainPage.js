import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import WordCount from './WordCount';
import WordMeaning from './WordMeaning';
import ShowPrevWord from './ShowPrevWord';
import ShowNextWord from './ShowNextWord';
import Examples from './Examples';
import EditWordModal from '../modal/EditWordModal';

import './mainPage.css';

import { AuthContext } from '../../context/AuthContext';
import { WordListContext } from '../../context/WordListContext';

export default function MainPage() {
  const [authInfo, setAuthInfo] = useContext(AuthContext);
  const [wordList, setWordList] = useContext(WordListContext);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const nthWordInput = React.createRef();
  const findWordInput = React.createRef();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadWordList();
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
      console.error(error);
    }
  }

  async function deleteWord(word) {
    const wordName = word.wordName;
    const wordId = word['_id'];
    if (window.confirm(`Do you want to delete the word '${wordName}'?`)) {
      try {
        const response = await axios.delete(`/api/word/${wordId}`);

        if (response.status === 200) {
          setCurrentWordIndex(0);
          loadWordList();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function openEditWordModal() {
    setIsEditModalOpen(true);
  }

  if (!authInfo.isAuthenticated) {
    return <Redirect to="/" />
  }

  function handleShuffle() {
    setCurrentWordIndex(0);
    setWordList(shuffleList(wordList));
  }

  function handleMoveToNthWord() {
    const nthWordIndex = Number(nthWordInput.current.value);

    if (nthWordIndex < 1 || nthWordIndex > wordList.length) {
      alert('Word number is invalid!');
      nthWordInput.current.focus();
      return;
    }
    else {
      setCurrentWordIndex(nthWordIndex - 1);
    }
  }

  function handleFindWord(e) {
    const findWordName = findWordInput.current.value.toLowerCase();
    let foundWord = false;
    wordList.map((word, index) => {
      if (word.wordName === findWordName) {
        setCurrentWordIndex(index);
        foundWord = true;
        return;
      }
    });

    if (!foundWord) {
      alert('Cannot find the word!');
    }
  }

  return (
    <React.Fragment>
      {isEditModalOpen ? <EditWordModal word={wordList[currentWordIndex]} setEditModalOpen={setIsEditModalOpen} /> : null}
      {wordList && wordList.length > 0 ? (
        <div id="main-container">
          <WordCount currentIndex={currentWordIndex} listLength={wordList.length} />
          <div id="main-container__move-to-nth-word">
            Go on to
            <input type="number" name="nthWord" ref={nthWordInput} min="1" max={wordList.length} step="1" />
            th word
            <button id="move-to-nth-word-button" onClick={handleMoveToNthWord}>Go!</button>
          </div>
          <div id="main-container__find-word">
            Find Word
            <input type="text" name="findWord" ref={findWordInput} />
            <button id="find-word-button" onClick={handleFindWord}>Find</button>
          </div>
          <WordMeaning wordList={wordList} currentIndex={currentWordIndex} />
          <Examples wordList={wordList} currentIndex={currentWordIndex} />
          <ShowPrevWord currentIndex={currentWordIndex} setWordIndex={setCurrentWordIndex} listLength={wordList.length} />
          <ShowNextWord currentIndex={currentWordIndex} setWordIndex={setCurrentWordIndex} listLength={wordList.length} />
          <div id="main-container__buttons-container">
            <button id="buttons-container__edit-button" type="button" onClick={openEditWordModal}>EDIT</button>
            <button id="buttons-container__delete-button" type="button" onClick={() => deleteWord(wordList[currentWordIndex])}>DELETE</button>
            <button id="buttons-container__shuffle-button" type="button" onClick={handleShuffle}>SHUFFLE!</button>
          </div>
        </div>
      ) : <p id="notice-empty-list">The vocabulary list is empty! Why don't you add a new word?</p>}
    </React.Fragment>
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