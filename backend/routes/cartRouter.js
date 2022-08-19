const express = require("express");
const { protect } = require("./verifyToken");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");
//REGISTER
router.get("/", getCart);
router.post("/add", protect, addToCart);
//login
router.delete("/remove", removeFromCart);

module.exports = router;
