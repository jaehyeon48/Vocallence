const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  wordName: { type: String, required: true },
  wordClass: { type: String, required: true },
  wordMeaning: { type: String, required: true },
  Examples: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;