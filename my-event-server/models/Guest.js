const mongoose = require("mongoose");

const GuestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
    default: null
  },
  quantity: {
    type: Number,
    default: 1
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tables",
    default: null
  },
  classification: {
    type: Number,
    default: 0
  },
  ride: {
    type: Boolean,
    default: false
  },
  attention: {
    type: Boolean,
    default: false
  },
  comment: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("guest", GuestSchema);
