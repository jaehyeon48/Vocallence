const express = require('express');

const router = express.Router();

const authCheck = require('../middlewares/authMiddleware');

const {
  isAuthenticatedController,
  signUpController,
  loginController,
  logoutController
} = require('../controllers/authController');

// @ROUTE         GET api/auth
// @DESCRIPTION   check authentication
// @ACCESS        Private
router.get('/', authCheck, isAuthenticatedController);

// @ROUTE         POST api/auth/signup
// @DESCRIPTION   Register user
// @ACCESS        Public
router.post('/signup', signUpController);

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
router.post('/', loginController);

// @ROUTE         GET api/auth/logout
// @DESCRIPTION   Logout the user
// @ACCESS        Private
router.get('/logout', authCheck, logoutController);

module.exports = router;