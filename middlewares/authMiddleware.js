const {paths} = require('../config/pathsToAuthenticate');

authIfNeeded = (req, res, next)=>{
    console.log(req.path,req.url);
    const path = req.path.toLowerCase();
    const toAuthenticate = paths.includes(path);
    if(toAuthenticate){
        //todo add authentication
        console.log('to authenticate path:',req.path);
    }
    else{
        next();
    }
};

module.exports = authIfNeeded;
