const express = require('express');

const router = express.Router();

const { loginController } = require('../controllers/authController');

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
router.post('/', loginController);

module.exports = router;