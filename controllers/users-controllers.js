
//old
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
  const { name, email, password, type } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists with this email.' });
    }

    // Create a new user
    const createdUser = new User({
      name,
      email,
      profilePic: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
      password,
      role : type
      
    });
    console.log(createdUser)

    // Save the user to the database
    await createdUser.save();

    // Respond with the created user data
    res.status(201).json({ user: createdUser});

  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }
};
//

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  // console.log("random")
  try {
    existingUser = await User.findOne({ email: email });
    console.log("existingUser_____________________", existingUser);
    
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!',role:existingUser.role});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;