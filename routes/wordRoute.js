const express = require('express');

const router = express.Router();

const authCheck = require('../middlewares/authMiddleware');

const {
  getWordsController,
  addNewWord
} = require('../controllers/wordController');

// @ROUTE         GET api/word
// @DESCRIPTION   Get all the full list of words
// @ACCESS        Private
router.get('/', authCheck, getWordsController);

// @ROUTE         POST api/word
// @DESCRIPTION   Get all the full list of words
// @ACCESS        Private
router.post('/', authCheck, addNewWord);

module.exports = router;