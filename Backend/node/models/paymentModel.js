const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment: {
      type: mongoose.Schema.Types.Mixed
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);