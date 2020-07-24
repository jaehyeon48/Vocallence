import React, { useState, createContext } from 'react';

export const WordListContext = createContext();

export function WordListProvider(props) {
  const [wordList, setWordList] = useState([]);

  return (
    <WordListContext.Provider value={[wordList, setWordList]}>
      {props.children}
    </WordListContext.Provider>
  );
}