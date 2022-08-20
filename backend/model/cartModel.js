const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      InStock: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Cart", cartSchema);
