const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

//UPDATE USER

router.get("/", getAllProducts);
router.get("/:id", getProductById);
// router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
// router.get("/find/:id", verifyTokenAndAuthorization, getUser);
// router.get("/", getAllUser);

module.exports = router;
