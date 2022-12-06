const mongoose = require("mongoose");
const wishSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  wishItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      qty: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      InStock: {
        type: Number,
        // required: true,
      },
      brand: {
        type: "String",
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Wish", wishSchema);
