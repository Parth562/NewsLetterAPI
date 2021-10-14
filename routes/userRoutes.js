const express = require('express');
const User = require('../models/userModel');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUser) // To get all the users
  .post(userController.createUser); // To create/subscribe a new user

router
  .route('/:id')
  .get(userController.getUser) // To get details of a particular user
  .patch(userController.updateUser) // To updata details of a particular user
  .delete(userController.deleteUser); // To delete/unsubcribe a user from out mail list

module.exports = router;
