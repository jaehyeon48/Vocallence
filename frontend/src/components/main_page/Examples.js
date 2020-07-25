import React, { useState, useEffect } from 'react';

import ExampleItem from './ExampleItem';

export default function Examples({
  wordList,
  currentIndex
}) {
  const [currentWord, setCurrentWord] = useState(wordList[currentIndex].wordName);

  useEffect(() => {
    setCurrentWord(wordList[currentIndex].wordName);
  }, [wordList, currentIndex]);
  return (
    <div id="main-container__examples-container">
      <div id="examples-notice">Examples: </div>
      <ul>
        {
          wordList.length > 0 &&
          wordList[currentIndex].examples.map((example, index) => (
            <ExampleItem key={index} example={example} currentWord={currentWord} />
          ))
        }
      </ul>
    </div>
  );
}