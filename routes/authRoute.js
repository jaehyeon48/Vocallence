const express = require('express');

const router = express.Router();

const authCheck = require('../middlewares/authMiddleware');

const {
  loginController,
  logoutController
} = require('../controllers/authController');

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
router.post('/', loginController);

// @ROUTE         GET api/auth/logout
// @DESCRIPTION   Logout the user
// @ACCESS        Private
router.get('/logout', authCheck, logoutController);

module.exports = router;