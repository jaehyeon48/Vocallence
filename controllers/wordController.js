const User = require('../models/UserModel');
const Word = require('../models/WordModel');

// @ROUTE         GET api/word
// @DESCRIPTION   Get all the full list of words
// @ACCESS        Private
async function getWordsController(req, res) {
  try {
    const userId = await User.findById(req.user.id, '-password -firstName -lastName -email -date -__v');

    const wordList = await Word.find({ user: userId });

    res.json(wordList);
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         POST api/word
// @DESCRIPTION   Get all the full list of words
// @ACCESS        Private
async function addNewWord(req, res) {
  const userId = req.user.id;
  const { wordName, wordClass, wordMeaning, examples } = req.body;
  try {
    const isWordDuplicated = await Word.findOne({ wordName });
    if (isWordDuplicated) {
      return res.status(400).json({ msg: 'This word already exists in the list' });
    }

    const newWord = new Word({
      wordName,
      wordClass,
      wordMeaning,
      examples,
      user: userId
    });

    const addedWord = await newWord.save();

    res.status(201).json(addedWord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         PATCH api/word/:id
// @DESCRIPTION   Edit a word
// @ACCESS        Private
async function editWord(req, res) {
  try {

  } catch (error) {

  }
}

// @ROUTE         DELETE api/word/:id
// @DESCRIPTION   Delete a word
// @ACCESS        Private
async function deleteWord(req, res) {
  try {
    const wordId = req.params.id;
    await Word.findByIdAndRemove(wordId);
    return res.send('Deletion success');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getWordsController,
  addNewWord,
  editWord,
  deleteWord
};