const express = require('express');

const router = express.Router();

const authCheck = require('../middlewares/authMiddleware');

const {
  getWordsController,
  addNewWord,
  editWord,
  deleteWord
} = require('../controllers/wordController');

// @ROUTE         GET api/word
// @DESCRIPTION   Get all the full list of words
// @ACCESS        Private
router.get('/', authCheck, getWordsController);

// @ROUTE         POST api/word
// @DESCRIPTION   Get all the full list of words
// @ACCESS        Private
router.post('/', authCheck, addNewWord);

// @ROUTE         PATCH api/word/:id
// @DESCRIPTION   Edit a word
// @ACCESS        Private
router.patch('/:id', authCheck, editWord);

// @ROUTE         DELETE api/word/:id
// @DESCRIPTION   Delete a word
// @ACCESS        Private
router.delete('/:id', authCheck, deleteWord);

module.exports = router;