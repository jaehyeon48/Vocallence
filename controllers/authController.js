const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/UserModel');

// @ROUTE         POST api/auth/signup
// @DESCRIPTION   Register user
// @ACCESS        Public
async function signUpController(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password
    });

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();

    const jwtPayload = {
      user: { id: newUser.id }
    };

    // for production, use expiresIn: '1h'
    jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
      if (err) throw err;
      res.status(200).cookie('token', token, { httpOnly: true, sameSite: true }).send(newUser.firstName);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
async function loginController(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Email or Password is invalid. Please check again!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'Email or Password is invalid. Please check again!' });
    }

    const jwtPayload = {
      user: { id: user.id }
    };

    jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
      if (err) throw err;
      return res.status(200).cookie('token', token, { httpOnly: true, sameSite: true }).send(user.firstName);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         GET api/auth/logout
// @DESCRIPTION   Logout the user
// @ACCESS        Private
function logoutController(req, res) {
  res.status(200).cookie('token', '', { maxAge: '-1' }).json({ msg: 'Successfully logged out' });
}

module.exports = {
  signUpController,
  loginController,
  logoutController
};