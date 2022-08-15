const mongoose = require("mongoose");
const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");

const placeOrder = asyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "cart is empty" });
  } else {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      // itemsPrice: req.body.itemsPrice,
      // shippingPrice: req.body.shippingPrice,
      // taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  }
});
module.exports = {
  placeOrder,
};
