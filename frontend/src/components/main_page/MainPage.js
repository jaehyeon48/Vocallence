import React from 'react';

import WordCount from './WordCount';
import WordMeaning from './WordMeaning';
import ShowPrevWord from './ShowPrevWord';
import ShowNextWord from './ShowNextWord';
import Examples from './Examples';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

export default function MainPage() {
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
