const Order = require('../models/Order');
const responses = require('../config/responses').sentencesResponses;


/**
 * get all orders function
 */ 
 exports.getAllOrders = (req, res) => {
    Order.find({isActive: true})
        .then(docs => {
            if( docs === null ) {
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);
            } else {
                const retData = responses.GET.SUCCESS;
                retData.json.data = docs;
                res.status(retData.code).json(retData.json);
            }            
        })
        .catch(err =>{
            return handleDbError(res, err);
        });
};


/**
 * get all client the orders function
 */ 
exports.getAllClientOrders = (req, res) => {
    let { clientId } = req.params;
    if(clientId === null) {
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    } else {
        clientId = parseInt(clientId);
    }

    Order.find({clientId: clientId, isActive: true})
        .then(docs => {
            if( docs === null ) {
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);
            } else {
                const retData = responses.GET.SUCCESS;
                retData.json.data = docs;
                res.status(retData.code).json(retData.json);
            }            
        })
        .catch(err =>{
            return handleDbError(res, err);
        });
};


/**
 * add order function
 */ 
exports.addOrder = async (req,res) => {
    let { sentenceId, clientId, platform, style } = req.body;

    if(typeof sentenceId == "undefined" || typeof clientId == "undefined") {
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    } else {
        sentenceId = parseInt(sentenceId);
        clientId = parseInt(clientId);
    }

    if(platform !== "canvas" && platform !== "photo" && platform !== "t-shirt")
        return res.status(responses.WRONG_PARAMS.code).json(responses.WRONG_PARAMS.json);

    const orderData = { sentenceId: sentenceId, clientId: clientId, platform: platform };

    if (typeof style == "object")
        orderData.style = style;

    orderData.orderId = await getLastId()+1;
    const order = new Order(orderData);
    order.save()
        .then(result => {
            if(result) {
                // add num of orders
                return res.status(responses.ADD.SAVED_SUCCESSFULLY.code).json(responses.ADD.SAVED_SUCCESSFULLY.json);
            } else {
                return res.status(responses.ADD.FAILURE.code).json(responses.ADD.FAILURE.json);
            }
        })
        .catch(
            err => {
                return handleDbError(res, err);
            });
};

/**
 * update order function
 */ //test
exports.updateOrder = (req, res) => {
    let {orderId = null} = req.params;
    const { platform = null, style = null } = req.body;
    if(orderId === null) {
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    } else {
        orderId = parseInt(orderId);
    }
    if(platform !== "canvas" && platform !== "photo" && platform !== "t-shirt")
        return res.status(responses.WRONG_PARAMS.code).json(responses.WRONG_PARAMS.json);

    Order.findOne({orderId: orderId, isActive: true})
        .then( doc => {
            if( doc === null )
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);

            doc.platform = platform;
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

/**
 * delete order function
 */ 
exports.deleteOrder = (req, res) => {
    let {orderId = null} = req.params;
    let { clientId = null } = req.body;
    if(orderId === null || clientId === null ) {
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    } else {
        orderId = parseInt(orderId);
        clientId = parseInt(clientId);
    }

    Order.findOne({orderId: orderId, clientId: clientId, isActive: true})
        .then(doc => {
            if( doc === null )
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);

            doc.isActive = false;
            doc.save()
                .then(result => {
                    if(result) {
                        // --num of orders
                        return res.status(responses.DELETE.SUCCESS.code).json(responses.DELETE.SUCCESS.json);
                    } else {
                        return res.status(responses.ERROR_OCCURRED.code).json(responses.ERROR_OCCURRED.json);
                    }
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


getLastId = async () => {
    const lastId = await Order.findOne({}).sort('-orderId');
    if(lastId)
        return lastId.orderId;
    else
        return 0;
};

