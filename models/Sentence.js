const mongoose = require('mongoose');
const sentence = {
    sentenceBody: { type: String, required: true },
    writerId: { type: String, required: true },
    numOfOrders: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    style: [{
        textColor: { type: String, default: 'black' },
        backgorundColor: { type: String, default: 'white' },
        fomtFamily: { type: String, default: 'Comic Sans MS", cursive, sans-serif' },
    }],
};

const sentenceSchema = mongoose.Schema(sentence);
const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;
