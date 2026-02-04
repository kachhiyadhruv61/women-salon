const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

/* 🟢 USER ORDER CREATE */
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

/* 🟢 ADMIN – GET ALL ORDERS */
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

/* 🟢 USER – GET OWN ORDERS */
router.get("/user/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

/* 🟢 ADMIN – UPDATE STATUS */
router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.status },
    { new: true }
  );
  res.json(order);
});

module.exports = router;
