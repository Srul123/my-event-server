const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @route POST api/users
// @desc Register a user
// @access Public 

router.post('/', (req, res) => {
    res.send('Register a user');
});

module.exports = router;
