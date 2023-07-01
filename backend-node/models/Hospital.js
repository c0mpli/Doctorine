const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  numberOfBeds: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  admins: {
    type: Array,
    required: false,
    default: [],
  },
  doctors: {
    type: Array,
    required: false,
    default: [],
  },
  nurses: {
    type: Array,
    required: false,
    default: [],
  },
  patients: {
    type: Array,
    required: false,
    default: [],
  },
  beds: {
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
