const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const apartmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "An apartment must have a name!"],
    minLength: [5, "An apartment name should be greater than 5 characters."],
  },
  apartmentNum: {
    type: Number,
    default: 0,
    unique: [true, "Each apartment should have its own number."],
  },
  location: {
    type: String,
  },
  floors: {
    type: Number,
  },
  units: {
    type: Number,
  },
  apartmentType: {
    type: String,
    // enum: ["Flats", "Plot", "Hotel", "Hostel"],
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
});

/**Document presave middleware for counting and incremeanting the apartmentNum property */
apartmentSchema.pre("save", async function (next) {
  console.log(this.isNew);
  if (!this.isNew) return next();

  // const counter = await mongoose.model("Apartment").countDocuments({});
  const counter = await Counter.findOneAndUpdate(
    { _id: "apartmentNum" },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );

  this.apartmentNum = counter.sequence;
  next();
});

const Apartment = new mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
