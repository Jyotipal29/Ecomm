const express = require("express");
const { protect } = require("./verifyToken");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");
//REGISTER
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
//login
router.delete("/:id", protect, removeFromCart);

module.exports = router;
