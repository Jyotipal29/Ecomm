const mongoose = require("mongoose");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const updateUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(403);
    throw new Error("you can only update ur  account");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } else {
    res.status(403);
    throw new Error("you can only delete ur  account");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("user not there");
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("user not there");
  }
});

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
};
