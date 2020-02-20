const { Router } = require('express');
const UsersRouter = new Router();
const {
    getUserById,
    authEmailUser,
    addUser,
    addFacebookUser,
    updateUser,
    deleteUser } = require('../controllers/UsersController');

//path = /users/
UsersRouter.get('/', getUserById);

//path = /users/authUser
UsersRouter.post('/auth', authEmailUser);

//path = /users/isWriter?userId=x

//path = /users
UsersRouter.post('/', addUser);

//path = /users/facebookUser
UsersRouter.post('/facebookUser', addFacebookUser);

//path = /users/updateUser/<userId>
UsersRouter.put('/updateUser/:userId', updateUser);

//path = /users/deleteUser/<userId>
UsersRouter.delete('/deleteUser/:userId', deleteUser);

module.exports = UsersRouter;
