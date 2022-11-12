const express = require("express");
const { protect } = require("./verifyToken");
const router = express.Router();
const {
  getWish,
  addToWish,
  removeFromWish,
} = require("../controllers/wishController");
//REGISTER
router.get("/", protect, getWish);
router.post("/add", protect, addToWish);
//login
router.delete("/:id", protect, removeFromWish);

module.exports = router;
