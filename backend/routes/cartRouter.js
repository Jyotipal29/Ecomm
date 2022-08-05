const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const {
  createCart,
  updateCart,
  deleteCart,
  getAllCart,
  getCart,
} = require("../controllers/cartController");

router.post("/", verifyTokenAndAuthorization, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/", getAllCart);
router.get("/find/:id", getCart);
module.exports = router;
