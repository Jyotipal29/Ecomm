const express = require("express");
const router = express.Router();
const { protect } = require("./verifyToken");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controllers/userController");

//UPDATE USER

router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.get("/find/:id", protect, getUser);
// router.get("/", getAllUser);

module.exports = router;
