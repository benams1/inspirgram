const mongoose = require('mongoose');
const user = {

};

const userSchema = mongoose.Schema(user);
const User = mongoose.model('User', userSchema);

module.exports = User;
