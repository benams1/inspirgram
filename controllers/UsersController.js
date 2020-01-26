const User = require('../models/User');
const responses = require('../config/responses').usersResponses;


/**
 * get all users function
 */
exports.getAllUsers = (req , res) => {
    User.find()
        .then( doc => {
            if( doc === null ) {
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);
            } else {
                const retData = responses.GET.SUCCESS;
                retData.json.data = doc;
                res.status(retData.code).json(retData.json);
            }
        })
        .catch(
            err => {
                return handleDbError(res, err);
            });
};


/**
 * get user by id function
 */
exports.getUserById = (req , res) => {
    let { userId } = req.params;
    if(userId === null) {
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    } else {
        userId = parseInt(userId);
    }
    User.findOne({userId: userId})
        .then( doc => {
            if( doc === null ) {
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);
            } else {
                const retData = responses.GET.SUCCESS;
                retData.json.data = doc;
                res.status(retData.code).json(retData.json);
            }
        })
        .catch(
            err => {
                return handleDbError(res, err);
            });
};


/**
 * if the user exist (log-in) function
 */
exports.isUser = (req , res) => {
    const { password, email } = req.body;
    User.findOne({password: password, email: email})
        .then( doc => {
            if( doc === null ) {
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);
            } else {
                const retData = responses.GET.SUCCESS;
                retData.json.data = doc;
                res.status(retData.code).json(retData.json);
            }
        })
        .catch(
            err => {
                return handleDbError(res, err);
            });
};


/**
 * if the user is writer function
 */
exports.isWriter = (req , res) => {
    let { userId } = req.params;
    if(userId === null) {
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    } else {
        userId = parseInt(userId);
    }
    User.findOne({userId: userId, userType: "writer"})
        .then( doc => {
            if( doc === null ) {
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);
            } else {
                const retData = responses.GET.SUCCESS;
                retData.json.data = doc;
                res.status(retData.code).json(retData.json);
            }
        })
        .catch(
            err => {
                return handleDbError(res, err);
            });
};

/**
 * add user function
 */ 
exports.addUser = async (req,res) => {

    let { name, password, email, age, userType } = req.body;

    if(typeof name == "undefined" || typeof password == "undefined" || typeof email == "undefined" || typeof age == "undefined")
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);

    age = parseInt(age);
    if((userType !== "writer") && (userType !== "client")) 
        return res.status(responses.WRONG_PARAMS.code).json(responses.WRONG_PARAMS.json);

    const userData = { name: name, password: password, email: email, age: age, userType: userType};

    userData.userId = await getLastId()+1;
    const user = new User(userData);
    user.save()
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

/**
 * update user function
 */ 
exports.updateUser = (req, res) => {
    let {userId = null} = req.params;
    userId = parseInt(userId);
    let { name = null , password = null , email = null, age = null, userType = null } = req.body;
    
    User.findOne({userId: userId})
        .then( doc => {
            if( doc === null )
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);

            doc.name = name !== null ? name : doc.name;
            doc.password = password !== null ? password : doc.passwor ;
            doc.email = email !== null ? email : doc.email;
            if(age !== null) {
                age = parseInt(age);
                doc.age = age;
            }
            if(userType !== null) {
                if(userType === "writer" || userType === "client")
                    doc.userType = userType;
            }

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
 * delete user function
 */ 
exports.deleteUser = (req, res) => {
    let {userId = null} = req.params;
    if(userId === null) 
        return res.status(responses.MISSING_PARAMS.code).json(responses.MISSING_PARAMS.json);
    userId = parseInt(userId);

    User.findOne({userId: userId})
        .then(doc => {
            if( doc === null )
                return res.status(responses.NOT_FOUND.code).json(responses.NOT_FOUND.json);

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


getLastId = async () => {
    const lastId = await User.findOne({}).sort('-userId');
    if(lastId)
        return lastId.userId;
    else
        return 0;
};


