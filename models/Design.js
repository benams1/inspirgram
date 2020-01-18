const mongoose = require('mongoose');
const design = {

};

const designSchema = mongoose.Schema(design);
const Sentence = mongoose.model('Sentence', designSchema);

module.exports = Sentence;
