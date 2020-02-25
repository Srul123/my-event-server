const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Guest = require("../models/Guest");

// @route GET api/guests
// @desc Get All user's guests
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(guests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/guests
// @desc Add new guest
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      phone,
      address,
      group,
      quantity,
      table,
      classification,
      ride,
      attention,
      comment,
      date
    } = req.body;

    try {
      const newGuest = new Guest({
        user: req.user.id,
        name,
        phone,
        address,
        group,
        quantity,
        table,
        classification,
        ride,
        attention,
        comment,
        date
      });

      const guest = await newGuest.save();

      res.json(guest);
    } catch (err) {
      console.error(er.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/guests
// @desc Edit guest
// @access Private
router.put("/:id", auth, async (req, res) => {
  console.log(req.body);
  const {
    name,
    phone,
    address,
    group,
    quantity,
    table,
    classification,
    ride,
    attention,
    comment,
    date
  } = req.body;
  console.log("name");
  console.log(name);

  // Build guest object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (address) contactFields.address = address;
  if (group) contactFields.group = group;
  if (quantity) contactFields.quantity = quantity;
  if (table) contactFields.table = table;
  if (classification) contactFields.classification = classification;
  if (ride) contactFields.ride = ride;
  if (attention) contactFields.attention = attention;
  if (comment) contactFields.comment = comment;
  if (date) contactFields.date = date;

  try {
    let guest = await Guest.findById(req.params.id);

    if (!guest)
      return res.status(404).json({
        msg: "guest not found"
      });

    // Make sure user owns contact
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "Not authorized"
      });
    }

    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(guest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/guests
// @desc Delete guest
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);

    if (!guest) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Guest.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
