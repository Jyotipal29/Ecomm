const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SEC,
    { expiresIn: "30d" }
  );

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ user, accessToken });
  } else {
    res.status(400);
    throw new Error("invalid users");
  }
});

module.exports = {
  register,
  login,
};
