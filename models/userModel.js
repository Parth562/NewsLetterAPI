const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'user must have a name'],
    minlength: [4, 'name must be greater than 4 character'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: [true, 'user email must be unique'],
    validate: [validator.isEmail, 'Invalid email entered...'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
