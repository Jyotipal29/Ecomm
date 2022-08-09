const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.put("/:id", verifyTokenAndAuthorization, updateProduct);
router.delete("/:id", verifyTokenAndAuthorization, deleteProduct);
router.get("/", getAllProduct);
router.get("/find/:id", getProduct);
module.exports = router;
