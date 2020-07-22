const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/UserModel');

// @ROUTE         POST api/user
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
      res.status(200).cookie('token', token, { httpOnly: true, sameSite: true }).send(newUser);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

module.exports = { signUpController };