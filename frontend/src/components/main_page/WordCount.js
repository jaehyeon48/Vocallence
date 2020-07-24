import React from 'react';

export default function WordCount({
  currentIndex,
  listLength
}) {
  return (
    <div id="main-container__word-counter">
      {currentIndex + 1} / {listLength}
    </div>
  );
}