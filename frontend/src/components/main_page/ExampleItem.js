import React, { useState, useEffect } from 'react';

export default function ExampleItem({
  example,
  currentWord
}) {
  const [highlightedSentence, setHighlightedSentence] = useState('');
  useEffect(() => {
    const wrapCurrentWord = `<span class="highlight-word">${currentWord}</span>`;
    const wrappedSentence = example.sentence.replace(RegExp(currentWord, 'i'), wrapCurrentWord);
    setHighlightedSentence(wrappedSentence);
  }, [example, currentWord]);

  function createMarkup() {
    return { __html: highlightedSentence };
  }

  return (
    <li className="example-item" dangerouslySetInnerHTML={createMarkup()}></li>
  );
}