const mongoose = require('mongoose');
const sentence = {

};

const sentenceSchema = mongoose.Schema(sentence);
const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;
