const express = require('express');

const router = express.Router();

const { signUpController } = require('../controllers/userController');

// @ROUTE         POST api/user
// @DESCRIPTION   Register user
// @ACCESS        Public
router.post('/', signUpController);

module.exports = router;