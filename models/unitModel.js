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
    type: String,
  },
  floor: {
    type: Number,
  },
  vacant: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
