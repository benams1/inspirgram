const { Router } = require('express');
const UsersRouter = new Router();
const { getAllUsers,
    getUserById,
    authUser,
    isWriter,
    addUser,
    addFacebookUser,
    updateUser,
    deleteUser } = require('../controllers/UsersController');

//path = /users/
UsersRouter.get('/', getAllUsers);

//path = /users/getUser/<userId>
UsersRouter.get('/getUser/:userId', getUserById);

//path = /users/authUser
UsersRouter.get('/authUser', authUser);

//path = /users/isWriter?userId=x
UsersRouter.get('/isWriter/:userId', isWriter);

//path = /users
UsersRouter.post('/', addUser);

//path = /users/facebookUser
UsersRouter.post('/facebookUser', addFacebookUser);

//path = /users/updateUser/<userId>
UsersRouter.put('/updateUser/:userId', updateUser);

//path = /users/deleteUser/<userId>
UsersRouter.delete('/deleteUser/:userId', deleteUser);

module.exports = UsersRouter;