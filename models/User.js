const mongoose = require('mongoose');
const user = {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    userType: { 
        type: String, 
        required: true,
        enum: ["client", "writer"]
     },
};

const userSchema = mongoose.Schema(user);
const User = mongoose.model('User', userSchema);

module.exports = User;
