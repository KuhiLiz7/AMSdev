const mongoose = require("mongoose");

const apartmentSchema = mongoose.Schema({
  name: {
    type: String,
  },
  apartmentNum: {
    type: Number,
  },
  location: {
    type: String,
  },
  floors: {
    type: String,
  },
  units: {
    type: Number,
  },
  apartmentType: {
    type: String,
    // enum: ["Flats", "Plot", "Hotel", "Hostel"],
  },
  photo: {
    type: String,
  },
});

const Apartment = new mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
