const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controllers/userController");

//UPDATE USER

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAuthorization, getUser);
// router.get("/", getAllUser);

module.exports = router;
