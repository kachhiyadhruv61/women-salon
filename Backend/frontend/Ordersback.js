const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  userName: String,
  contact: String,
  totalAmount: Number,
  orderStatus: {
    type: String,
    default: "Pending",
  },
  paymentMethod: String,
  paymentStatus: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
