const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require("../controllers/productController");

router.post("/", verifyTokenAndAuthorization, createProduct);
router.put("/:id", verifyTokenAndAuthorization, updateProduct);
router.delete("/:id", verifyTokenAndAuthorization, deleteProduct);
router.get("/", getAllProduct);
router.get("/find/:id", getProduct);
module.exports = router;
