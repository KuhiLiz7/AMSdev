const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: String,
  token: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: Date,
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
