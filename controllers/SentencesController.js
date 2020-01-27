const Sentence = require('../models/Sentence');
const responses = require('../config/responses').sentencesResponses;


generalGet = (req, res, searchTerm, then_func) => {
    Sentence.find(searchTerm)
        .then(then_func)
        .catch(
            err => {
                return handleDbError(res, err);
            });

};
/**
 * get all the sentences function
 */
exports.getAllSentences = (req, res) => {
    const then_func = sentences =>{
        const retData = responses.GET.SUCCESS;
        retData.json.data = sentences;
        res.status(retData.code).json(retData.json);
    };
    return generalGet(req, res,{isActive: true}, then_func);
};
/**
 * get specific sentence function
 */
exports.getSentence = (req , res) => {
    const then_func = sentences =>{
        if(sentences.length !== 0){
            const retData = responses.GET.SUCCESS;
            retData.json.data = sentences;
            res.status(retData.code).json(retData.json);
        }
        else
            res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);
    };
    return generalGet(req, res , {sentenceId: req.params.sentenceId, isActive: true},then_func);
};

exports.addSentence = async (req,res) => {
    const { sentenceBody, writerId, style } = req.body;

    if(typeof sentenceBody == "undefined" || typeof writerId == "undefined")
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);

    const sentenceData = { sentenceBody: sentenceBody, writerId: writerId};

    if (typeof style == "object")
        sentenceData.style = style;

    sentenceData.sentenceId = await getSentenceLastId()+1;
    const sentence = new Sentence(sentenceData);
    sentence.save()
        .then(result => {
            if(result)
                return res.status(responses.ADD.SAVED_SUCCESSFULLY.code).json(responses.ADD.SAVED_SUCCESSFULLY.json);
            else
                return res.status(responses.ADD.FAILURE.code).json(responses.ADD.FAILURE.json);
        })
        .catch(
            err => {
                return handleDbError(res, err);
            });
};


exports.updateSentence = (req, res) => {
    let {sentenceId = null} = req.params;
    sentenceId = parseInt(sentenceId);
    const { sentenceBody = null , style = null , userId = null } = req.body;
    if(sentenceId === null || userId === null)
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    Sentence.findOne({sentenceId: sentenceId})
        .then( doc => {
            if( doc === null )
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);

            if(doc.writerId !== userId)//todo maybe add master user privileged to edit all the sentences
                return res.status(responses.FORBIDDEN.code).json(responses.FORBIDDEN.json);

            doc.sentenceBody = sentenceBody !== null ? sentenceBody : doc.sentenceBody ;
            if(style !== null){
                doc.style.textColor = style.textColor !== undefined ? style.textColor : doc.style.textColor;
                doc.style.backgroundColor = style.backgroundColor !== undefined ? style.backgroundColor : doc.style.backgroundColor;
                doc.style.fontFamily = style.fontFamily !== undefined ? style.fontFamily : doc.style.fontFamily;
            }
            doc.updatedAt = Date.now();
            doc.save()
                .then(result => {
                    if(result)
                        return res.status(responses.UPDATE.SUCCESS.code).json(responses.UPDATE.SUCCESS.json);
                    else
                        return res.status(responses.UPDATE.FAILURE.code).json(responses.UPDATE.FAILURE.json);
                })
                .catch(err => {
                    return handleDbError(res, err);
                })
        })
        .catch(
            err => {
                return handleDbError(res, err);
            });
};


exports.deleteSentence = (req, res) => {
    const {sentenceId = null} = req.params;
    const { userId = null } = req.body;
    if(sentenceId === null || userId === null )
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);

    Sentence.findOne({sentenceId: sentenceId})
        .then(doc => {
            if( doc === null )
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);

            if(doc.writerId !== userId)//todo maybe add master user privileged to edit all the sentences
                return res.status(responses.FORBIDDEN.code).json(responses.FORBIDDEN.json);

            doc.isActive = false;
            doc.save()
                .then(result => {
                    if(result)
                        return res.status(responses.DELETE.SUCCESS.code).json(responses.DELETE.SUCCESS.json);
                    else
                        return res.status(responses.ERROR_OCCURRED.code).json(responses.ERROR_OCCURRED.json);
                })
                .catch(err => {
                    return handleDbError(res, err);
                })
        })
        .catch(err =>{
            return handleDbError(res, err);
        });
};

handleDbError = (res, err) =>{
    const retParams = responses.DB_ERROR;
    retParams.json.message += err.name + ` message: ${err.message}` ;
    res.status(retParams.code).json(retParams.json);
};


getSentenceLastId = async () => {
    const lastId = await Sentence.findOne({}).sort('-sentenceId');
    if(lastId)
        return lastId.sentenceId;
    else
        return 0;
};

exports.addNumOfOrders = sentenceId => {
    Sentence.findOne({sentenceId: sentenceId})
        .then( doc => {
            if( doc === null )
                return false;
            doc.numOfOrders += 1;
            doc.save()
                .then(result => {
                    if(result) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch(err => {
                    return false;
                })
        })
        .catch(
            err => {
                return false;
            });
};

exports.minusNumOfOrders = sentenceId => {
    Sentence.findOne({sentenceId: sentenceId})
        .then( doc => {
            if( doc === null )
                return false;
            doc.numOfOrders -= 1;
            doc.save()
                .then(result => {
                    if(result) {
                        return true;
                    } else {
                        return true;
                    }
                })
                .catch(err => {
                    return false;
                })
        })
        .catch(
            err => {
                return false;
            });
}


