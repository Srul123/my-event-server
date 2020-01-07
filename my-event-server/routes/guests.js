  
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
// @route GET api/guests
// @desc Get All user's guests
// @access Private
router.get("/", (req, res) => {
  res.send("Get all guests");
});


// @route POST api/guests
// @desc Add new guest
// @access Private
router.post("/", (req, res) => {
  res.send("Add guest");
});

// @route PUT api/guests
// @desc Edit guest
// @access Private
router.put("/:id", (req, res) => {
  res.send("Update guest");
});

// @route DELETE api/guests
// @desc Delete guest
// @access Private
router.put("/:id", (req, res) => {
  res.send("Delete guest");
});



module.exports = router;


