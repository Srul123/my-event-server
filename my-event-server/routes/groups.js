const express = require("express");
const router = express.Router();

// @route POST api/users
// @desc Register a group
// @access Public

router.post("/", (req, res) => {
  res.send("Register a group");
});

module.exports = router;
