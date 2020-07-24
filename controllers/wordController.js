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

    res.json(addedWord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

module.exports = {
  getWordsController,
  addNewWord
};