import React from 'react';

import ExampleItem from './ExampleItem';

export default function Examples({
  wordList,
  currentIndex
}) {
  return (
    <div id="main-container__examples-container">
      {
        wordList.length > 0 &&
        wordList[currentIndex].examples.map((example, index) => (
          <ExampleItem key={index} example={example} />
        ))
      }
    </div>
  );
}