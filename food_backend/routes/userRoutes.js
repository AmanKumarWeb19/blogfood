const express = require('express');
const userRouter = express.Router();

// Controller Location
const { userRegisterController, userLoginController } = require('../controllers/userControllers');

// Register a new user
userRouter.post('/register', userRegisterController);

// Login new user
userRouter.post('/login', userLoginController);

module.exports = { userRouter };