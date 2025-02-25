const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  unitType: {
    type: String,
    // enum: ["bedsitter", "single", "one-bedroom", "two-bedroom"],
  },
  unitNum: {
    type: Number,
  },
  floor: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  image: {
    type: String,
  },
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
