const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/UserModel');

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
      return res.status(200).cookie('token', token, { httpOnly: true, sameSite: true }).send(user);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

module.exports = { loginController };