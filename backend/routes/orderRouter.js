const express = require("express");

const router = express.Router();
const { protect } = require("./verifyToken");

const { orderDetails } = require("../controllers/orderController");

router.post("/", protect, orderDetails);

module.exports = router;
