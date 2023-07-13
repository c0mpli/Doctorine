const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: "patient",
  },
  hospitalId: {
    type: Array,
    required: false,
    default: [],
  },
  bedId: {
    type: Array,
    required: false,
    default: [],
  },
  data: {
    type: Object,
    required: false,
    default: {},
  },
});

module.exports = mongoose.model("User", userSchema);
