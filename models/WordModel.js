const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  wordName: { type: String, required: true },
  wordClass: { type: String, required: true },
  wordMeaning: { type: String, required: true },
  examples: {
    type: [{
      type: Object
    }],
    validate: [examplesLimit, 'Up to 3 examples can be stored.']
  },
  isFormal: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

function examplesLimit(examples) {
  return examples.length <= 3;
}

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;