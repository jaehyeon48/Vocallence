import React, { useState } from 'react';

import './addWordModal.css';

export default function AddWordModal() {
  const [addWordFormData, setAddWordFormData] = useState({
    wordName: '',
    wordClass: '',
    wordMeaning: '',
    examples: []
  });
  const [wordNameErr, setWordNameErr] = useState(false);

  const { wordName, wordClass, wordMeaning, examples } = addWordFormData;

  function handleChange(e) {

    setAddWordFormData({
      ...addWordFormData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div id="modal-background">
      <div id="modal-content">
        <div id="add-word-container">
          <form id="add-word-form">
            <div id="add-word-form__email-container">
              <input className={wordNameErr ? "auth-form-input-error" : "auth-form-input"} type="text" name="wordName" value={wordName} onChange={handleChange} required />
              <span className={wordNameErr ? "auth-form-label-error" : "auth-form-label"}>Word Name</span>
              {wordNameErr ? <small className="auth-error-notice"> - Please enter valid wordName.</small> : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}