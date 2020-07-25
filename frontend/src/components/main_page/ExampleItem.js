import React, { useState, useEffect } from 'react';

export default function ExampleItem({
  example,
  currentWord
}) {
  const [highlightedSentence, setHighlightedSentence] = useState('');
  useEffect(() => {
    const splitIntoWord = example.sentence.split(' ');
    const currentWordRegex = RegExp(currentWord);
    splitIntoWord.map((word, index) => {
      if (currentWordRegex.test(word.toLowerCase())) {
        const currentWordLength = currentWord.length;
        const exactMatchedWord = word.slice(0, currentWordLength);
        const afterMatchedWordPart = word.slice(currentWordLength);
        splitIntoWord[index] = `<span class="highlight-word">${exactMatchedWord}</span>${afterMatchedWordPart}`;
      }
      else {
        splitIntoWord[index] = word;
      }
    });
    setHighlightedSentence(splitIntoWord.join(' '));
  }, [example, currentWord]);

  function createMarkup() {
    return { __html: highlightedSentence };
  }

  return (
    <li className="example-item" dangerouslySetInnerHTML={createMarkup()}></li>
  );
}