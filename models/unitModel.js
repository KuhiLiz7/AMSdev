const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  unitType: {
    type: String,
    enum: ["bedsitter", "single", "one-bedroom", "two-bedroom"],
  },
  apartmentUnit: {
    type: String,
  },
  unitNum: {
    type: Number,
  },
  floor: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
