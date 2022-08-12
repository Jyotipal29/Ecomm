const express = require("express");
const router = express.Router();
const { protect } = require("./verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.get("/", getAllProduct);
router.get("/find/:id", getProduct);
module.exports = router;
