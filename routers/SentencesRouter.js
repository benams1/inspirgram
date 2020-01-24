const { Router } = require('express');
const SentenceRouter = new Router();
const { getAllSentences,
        getSentence,
        addSentence,
        updateSentence,
        deleteSentence } = require('../controllers/SentenceController');
//path = /sentence
SentenceRouter.get('/', getAllSentences);
//path = /sentence/<sentenceId>
SentenceRouter.get('/:sentenceId', getSentence);
//path = /sentence
SentenceRouter.post('/',addSentence);
//path = /sentence/<sentenceId>
SentenceRouter.put('/:sentenceId', updateSentence);
//path = /sentence/<sentenceId>
SentenceRouter.delete('/:sentenceId', deleteSentence);


module.exports = SentenceRouter;
