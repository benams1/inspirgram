const {paths} = require('../config/pathsToAuthenticate');

authIfNeeded = (req, res, next)=>{
    const path = req.path.toLowerCase();
    const toAuthenticate = paths.includes(path);
    if(toAuthenticate){
        //todo add authentication
        console.log('to authenticate path:',req.path);
    }else{
        console.log('not to authenticate path:',req.path);
    }
    next();
};

module.exports = authIfNeeded;
