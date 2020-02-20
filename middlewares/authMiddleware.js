const {paths} = require('../config/pathsToAuthenticate');
const {authEmailUser} = require('../controllers/UsersController') ;
const responses = require('../config/responses').genericsReponses;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const {TOKEN_NAME} = require('../utilities/consts');

authIfNeeded = (req, res, next) => {
    const path = req.path.toLowerCase();
    const toAuthenticate = paths.includes(path);
    const token = req.header(TOKEN_NAME);
    if(token){
        try{req.AuthUser = jwt.verify(token,jwtSecret);}
        catch(e){console.log('error to decode token');}
    }
    if(toAuthenticate){
        console.log('to authenticate path:',req.path);
        if(!token || !req.AuthUser){
            return handleUnAuthUser(res);
        }
        else
            next();
    }else{
        console.log('not to authenticate path:',req.path);
        next()
    }
};
const handleUnAuthUser = (res) => {
    return res.status(responses.UNAUTHORIZED_USER.code).json(responses.UNAUTHORIZED_USER.json);
};
module.exports = authIfNeeded;
