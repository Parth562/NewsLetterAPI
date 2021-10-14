const User = require('../models/userModel');

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json({
      status: 'success',
      length: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Successfully added user',
      user,
    });
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'successfully update the user..',
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};
