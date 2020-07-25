import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { WordListContext } from '../../context/WordListContext';

import './editWordModal.css';

export default function EditWordModal({
  setEditModalOpen,
  word
}) {
  const [editWordFormData, setEditWordFormData] = useState({
    wordName: '',
    wordClass: 'Noun',
    wordMeaning: '',
    isFormal: false,
    examples: [{
      id: uuidv4(),
      sentence: ''
    }]
  });
  const [wordList, setWordList] = useContext(WordListContext);
  const [originalName, setOriginalName] = useState('');
  const [wordNameErr, setWordNameErr] = useState(false);
  const [wordMeaningErr, setWordMeaningErr] = useState(false);
  const [alertDuplicateError, setAlertDuplicateError] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const { wordName, wordClass, wordMeaning, isFormal, examples } = editWordFormData;


  useEffect(() => {
    if (word) {
      setEditWordFormData({
        wordName: word.wordName,
        wordClass: word.wordClass,
        wordMeaning: word.wordMeaning,
        isFormal: word.isFormal,
        examples: word.examples
      });
      setOriginalName(word.wordName);
    }
  }, [word]);

  useEffect(() => {
    if (!isFirstSubmit && wordName.trim() === '') {
      setWordNameErr(true);
    }
    else if (!isFirstSubmit && wordName.trim() !== '') {
      setWordNameErr(false);
    }
  }, [isFirstSubmit, wordName]);

  useEffect(() => {
    if (!isFirstSubmit && wordMeaning.trim() === '') {
      setWordMeaningErr(true);
    }
    else if (!isFirstSubmit && wordMeaning.trim() !== '') {
      setWordMeaningErr(false);
    }
  }, [isFirstSubmit, wordMeaning]);

  useEffect(() => {
    if (!isFirstSubmit && (wordNameErr || wordMeaningErr)) {
      setIsSubmitDisabled(true);
    }
    else {
      setIsSubmitDisabled(false);
    }
  }, [isFirstSubmit, wordNameErr, wordMeaningErr]);


  async function editWord(formData) {
    const wordId = word['_id'];
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const reqBody = JSON.stringify({
      wordName: formData.wordName.toLowerCase(),
      wordClass: formData.wordClass,
      wordMeaning: formData.wordMeaning,
      isFormal: formData.isFormal,
      examples: formData.examples,
      originalName
    });
    try {
      const response = await axios.patch(`/api/word/${wordId}`, reqBody, config);
      if (response.status === 200) {
        setEditModalOpen(false);
        loadWordList();
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertDuplicateError(true);
        setTimeout(() => {
          setAlertDuplicateError(false);
        }, 3000);
      }
      else if (error.response.status === 404) {
        console.error('Word does not exist!');
      }
      console.error(error);
    }
  }

  async function loadWordList() {
    try {
      const response = await axios.get('/api/word');
      if (response.status === 200) {
        setWordList(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isFirstSubmit) {
      setIsFirstSubmit(false);
      setIsSubmitDisabled(true);

      if (wordName.trim() === '') {
        setWordNameErr(true);
      }
      if (wordMeaning.trim() === '') {
        setWordMeaningErr(true);
      }
      else {
        editWord(editWordFormData);
      }
    }
    else {
      editWord(editWordFormData);
    }
  }

  function handleChange(e) {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    if (targetName === 'isFormal') {
      let formality;
      if (targetValue === 'true') {
        formality = true;
      }
      else {
        formality = false;
      }
      setEditWordFormData({
        ...editWordFormData,
        [targetName]: formality
      });
    }
    else {
      setEditWordFormData({
        ...editWordFormData,
        [targetName]: targetValue
      });
    }
  }

  function handleExampleChange(e) {
    let changedExamples = [...examples];
    let index = e.target.dataset.index;
    changedExamples[index].sentence = e.target.value;
    setEditWordFormData({
      ...editWordFormData,
      examples: changedExamples
    });
  }

  function handleExitModal() {
    setEditModalOpen(false);
  }

  function handleAddExampleField() {
    if (examples.length > 2) {
      alert('You can add up to 3 examples!');
    }
    else {
      setEditWordFormData({
        ...editWordFormData,
        examples: [...examples, {
          id: uuidv4(),
          sentence: ''
        }]
      });
    }
  }

  function handleDeleteExample(exampleID) {
    let newExamples = examples.filter(example => example.id !== exampleID);
    setEditWordFormData({
      ...editWordFormData,
      examples: newExamples
    });
  }

  return (
    <div className="modal-background">
      <div className="modal-content">
        {alertDuplicateError ? <div className="modal-content__alert-duplicate">Word with the same name already exists!</div> : null}
        <span className="modal-exit-icon-container" onClick={handleExitModal}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 modal-exit-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </span>
        <div className="modal-word-container">
          <form className="modal-word-form" onSubmit={handleSubmit}>
            <div className="modal-word-form__word-name-container">
              <input className={wordNameErr ? "form-input-error" : "form-input"} type="text" name="wordName" value={wordName} onChange={handleChange} required />
              <span className={wordNameErr ? "form-label-error" : "form-label"}>Word Name</span>
              {wordNameErr ? <small className="form-error-notice"> - Please enter valclassName wordName.</small> : null}
            </div>
            <div className="modal-word-form__word-meaning-container">
              <input className={wordMeaningErr ? "form-input-error" : "form-input"} type="text" name="wordMeaning" value={wordMeaning} onChange={handleChange} required />
              <span className={wordMeaningErr ? "form-label-error" : "form-label"}>Word Meaning</span>
              {wordMeaningErr ? <small className="form-error-notice form-error-notice__word-meaning"> - Please enter valid wordMeaning.</small> : null}
            </div>
            <div className="modal-word-form__examples-container">
              <p className="examples-container__title">Examples: </p>
              <small className="examples-container__notice-max-number"> - You can add up to 3 example sentences.</small>
              <span className="examples-container__add-button" onClick={handleAddExampleField}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-square" className="svg-inline--fa fa-plus-square fa-w-14 example-add-button__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#C7DC44" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
              </span>
              {
                examples.map((example, index) => (
                  <div className={`example-container-${index + 1}`} key={example.id}>
                    <input className={`example-${index + 1} form-input`} name={`example${index + 1}`} value={example.sentence} onChange={handleExampleChange} data-index={index} required />
                    <span className="form-label">{`Example${index + 1}`}</span>
                    <span className="delete-example-button-container">
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-square" className="svg-inline--fa fa-minus-square fa-w-14 delete-example-button" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={() => handleDeleteExample(example.id)}><path fill="#dd3535" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"></path></svg>
                    </span>
                  </div>
                ))
              }
            </div>
            <div className="add-word-form__word-class-container">
              <p className="word-class-container__title">Part of speech: </p>
              <select className="word-class-container__select-word-class" name="wordClass" value={wordClass} onChange={handleChange}>
                <option value="Noun">Noun</option>
                <option value="Pronoun">Pronoun</option>
                <option value="Verb">Verb</option>
                <option value="Adjective">Adjective</option>
                <option value="Adverb">Adverb</option>
                <option value="Preposition">Preposition</option>
                <option value="Conjunction">Conjunction</option>
                <option value="Interjection">Interjection</option>
                <option value="Article">Article</option>
                <option value="Phrasal verb">Phrasal verb</option>
              </select>
            </div>
            <div className="word-formality-container">
              NOT Formal:
              <input type="radio" name="isFormal" value="false" checked={!isFormal} onChange={handleChange} />
              Formal:
              <input type="radio" name="isFormal" value="true" checked={isFormal} onChange={handleChange} />
            </div>
            <button className="add-word-form__submit-button" type="submit" disabled={isSubmitDisabled}>Edit Word</button>
          </form>
        </div>
      </div>
    </div>
  );
}
