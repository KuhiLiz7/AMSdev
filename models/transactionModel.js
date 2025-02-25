const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  paymentMethod: {
    type: String,
    default: "Mpesa",
  },
  createdAt: {
    type: Date,
  },
  amountPaid: {
    type: Number,
  },
  mpesatransactionCode: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
