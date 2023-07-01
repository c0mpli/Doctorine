const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema({
  hospitalId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: false,
  },
  doctorId: {
    type: String,
    required: false,
  },
  nurseId: {
    type: String,
    required: false,
  },
  bedNumber: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Bed", bedSchema);
