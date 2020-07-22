import React from 'react';
import './mock.css';

export default function Mock() {
  return (
    <React.Fragment>
      <nav id="navbar">
        <span id="navbar-span-1">Hi, Jason!</span>
        <span id="navbar-span-2">Log out</span>
      </nav>
      <main id="main-container">
        <div id="word-counts">7 / 136</div>
        <div id='main-word'>Drastically</div>
        <div id="part-of-speech">adverb</div>
        <div id="word-meaning">in a way that is severe and sudden or has very noticeable effects.</div>
        <section id="examples">
          <div id="examples-notice">Examples: </div>
          <ul>
            <li>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" className="svg-inline--fa fa-circle fa-w-16 examples-list-dot-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
              <div className="examples-list-sentence">Things have started to go <span className="examples-highlight-word">drastically</span> wrong.</div>
            </li>
            <li>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" className="svg-inline--fa fa-circle fa-w-16 examples-list-dot-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
              <div className="examples-list-sentence">However, the recent economic downturn has caused tourism to drop <span className="examples-highlight-word">drastically</span> in recent years.</div>
            </li>
            <li>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" className="svg-inline--fa fa-circle fa-w-16 examples-list-dot-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
              <div className="examples-list-sentence">Our communication environment has changed <span className="examples-highlight-word">drastically</span> in the last 10 years.</div>
            </li>
          </ul>
        </section>
        <svg id="icon-prev-word" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-left" className="svg-inline--fa fa-caret-left fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
          <path fill="currentColor" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path>
        </svg>
        <svg id="icon-next-word" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
          <path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
        </svg>
        <button type="button" id="edit-button">EDIT</button>
        <button type="button" id="delete-button">DELETE</button>
      </main>
    </React.Fragment>
  );
}