import React from 'react';

export default function WordMeaning({
  wordList,
  currentIndex
}) {
  return (
    <div id="main-container__word">
      <div id="main-container__word-name">{wordList.length > 0 && CapitalizeFirstChar(wordList[currentIndex].wordName)}</div>
      <div id="main-container__word-class">{wordList.length > 0 && wordList[currentIndex].wordClass}</div>
      <div id="main-container__word-formality">{wordList.length > 0 && wordList[currentIndex].isFormal ? <span>formal</span> : null}</div>
      <div id="main-container__word-meaning">{wordList.length > 0 && wordList[currentIndex].wordMeaning}</div>
    </div>
  );
}

function CapitalizeFirstChar(word) {
  let firstLetter = [...word][0];
  return [firstLetter.toUpperCase(), ...word.slice(1)].join('');
}