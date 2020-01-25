const { Router } = require('express');
const SentencesRouter = new Router();
const { getAllSentences,
        getSentence,
        addSentence,
        updateSentence,
        deleteSentence } = require('../controllers/SentencesController');
//path = /sentences
SentencesRouter.get('/', getAllSentences);
//path = /sentences/<sentenceId>
SentencesRouter.get('/:sentenceId', getSentence);
//path = /sentences
SentencesRouter.post('/',addSentence);
//path = /sentences/<sentenceId>
SentencesRouter.put('/:sentenceId', updateSentence);
//path = /sentences/<sentenceId>
SentencesRouter.delete('/:sentenceId', deleteSentence);


module.exports = SentencesRouter;