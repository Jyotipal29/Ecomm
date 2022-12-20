const express = require("express");
const { protect } = require("./verifyToken");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
  deleteCart,
} = require("../controllers/cartController");
//REGISTER
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/", protect, deleteCart);
//login
router.delete("/:id", protect, removeFromCart);

module.exports = router;
