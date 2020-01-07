const express = require("express");
const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Public
router.get("/", (req, res) => {
  res.send("Get log in user");
});

// @route POST api/auth
// @desc Auth user & get token
// @access Private
router.post("/", (req, res) => {
  res.send("log in user");
});

module.exports = router;
