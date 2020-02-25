const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const {check, validationResult} = require("express-validator");

const User = require("../models/User");
const Group = require("../models/Group");


// @route GET api/groups
// @desc Get All user's group
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route POST api/users
// @desc Register a group
// @access Public
router.post(
    '/',
    [
      auth,
      [
        check('name', 'Name is required')
            .not()
            .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, attention} = req.body;

      try {
        const newGroup = new Group({
          user: req.user.id,
          name: name,
          attention: attention
        });

        const group = await newGroup.save();

        res.json(group);
      } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
      }
    }
);

module.exports = router;
