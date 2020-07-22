const express = require('express');

const router = express.Router();

// @ROUTE         POST api/user
// @DESCRIPTION   Register user
// @ACCESS        Public
router.post('/', signUpController);

module.exports = router;