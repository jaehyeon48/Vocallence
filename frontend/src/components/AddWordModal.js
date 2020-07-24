import React, { useState } from 'react';
import axios from 'axios';

import './addWordModal.css';

export default function AddWordModal(props) {
  const [addWordFormData, setAddWordFormData] = useState({
    wordName: '',
    wordClass: 'Noun',
    wordMeaning: '',
    examples: ['']
  });
  const [wordNameErr, setWordNameErr] = useState(false);
  const [wordMeaningErr, setWordMeaningErr] = useState(false);
  const [alertDuplicateError, setAlertDuplicateError] = useState(false);

  const { wordName, wordClass, wordMeaning, examples } = addWordFormData;

  async function addNewWord(formData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const reqBody = JSON.stringify({
      wordName: formData.wordName.toLowerCase(),
      wordClass: formData.wordClass,
      wordMeaning: formData.wordMeaning,
      examples: formData.examples
    });
    try {
      const response = await axios.post('/api/word', reqBody, config);
      if (response.status === 200) {
        props.setOpenAddWordModal(false);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertDuplicateError(true);
        setTimeout(() => {
          setAlertDuplicateError(false);
        }, 3000);
      }
      console.error(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    addNewWord(addWordFormData);
  }

  function handleChange(e) {
    setAddWordFormData({
      ...addWordFormData,
      [e.target.name]: e.target.value
    });
  }

  function handleExampleChange(e) {
    let examples = [...addWordFormData.examples];
    let index = e.target.dataset.index;
    examples[index - 1] = e.target.value;
    setAddWordFormData({
      ...addWordFormData,
      examples
    });
  }

  function handleExitModal() {
    props.setOpenAddWordModal(false);
  }

  function handleAddExampleField() {
    if (examples.length > 2) {
      alert('You can add up to 3 examples!');
    }
    else {
      setAddWordFormData({
        ...addWordFormData,
        examples: [...examples, '']
      });
    }
  }

  return (
    <div id="modal-background">
      <div id="modal-content">
        {alertDuplicateError ? <div id="modal-content__alert-duplicate">Word with the same name already exists!</div> : null}
        <span id="modal-exit-icon-container" onClick={handleExitModal}>
          <svg id="modal-exit-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </span>
        <div id="add-word-container">
          <form id="add-word-form" onSubmit={handleSubmit}>
            <div id="add-word-form__word-name-container">
              <input className={wordNameErr ? "form-input-error" : "form-input"} type="text" name="wordName" value={wordName} onChange={handleChange} required />
              <span className={wordNameErr ? "form-label-error" : "form-label"}>Word Name</span>
              {wordNameErr ? <small className="form-error-notice"> - Please enter valid wordName.</small> : null}
            </div>
            <div id="add-word-form__word-meaning-container">
              <input className={wordNameErr ? "form-input-error" : "form-input"} type="text" name="wordMeaning" value={wordMeaning} onChange={handleChange} required />
              <span className={wordMeaningErr ? "form-label-error" : "form-label"}>Word Meaning</span>
              {wordMeaningErr ? <small className="form-error-notice"> - Please enter valid wordMeaning.</small> : null}
            </div>
            <div id="add-word-form__examples-container">
              <p id="examples-container__title">Examples: </p>
              <small id="examples-container__notice-max-number"> - You can add up to 3 example sentences.</small>
              <span id="examples-container__add-button" onClick={handleAddExampleField}>
                <svg id="example-add-button__icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-square" className="svg-inline--fa fa-plus-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path id="example-add-button__path" fill="#C7DC44" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
              </span>
              {
                examples.map((val, index) => (
                  <div id={`example-container-${index + 1}`} key={`example${index + 1}`}>
                    <input id={`example-${index + 1}`} className="form-input" name={`example${index + 1}`} value={examples[index]} onChange={handleExampleChange} data-index={index + 1} required />
                    <span className="form-label">{`Example${index + 1}`}</span>
                  </div>
                ))
              }
            </div>
            <div id="add-word-form__word-class-container">
              <p id="word-class-container__title">Part of speech: </p>
              <select id="word-class-container__select-word-class" name="wordClass" value={wordClass} onChange={handleChange}>
                <option value="Noun">Noun</option>
                <option value="Pronoun">Pronoun</option>
                <option value="Verb">Verb</option>
                <option value="Adjective">Adjective</option>
                <option value="Adverb">Adverb</option>
                <option value="Preposition">Preposition</option>
                <option value="Conjunction">Conjunction</option>
                <option value="Interjection">Interjection</option>
                <option value="Article">Article</option>
              </select>
            </div>
            <button id="add-word-form__submit-button" type="submit">Add New Word</button>
          </form>
        </div>
      </div>
    </div>
  );
}
