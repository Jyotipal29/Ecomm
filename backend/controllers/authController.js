const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const asyncHandler = require("express-async-handler");
//register
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({message: "please add all fields"});
  }

  //check if user exist
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400).json({message:"User already exixt"})
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({message:"invalid user"})
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      // password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Unauthorized access" });
  }
});
// const getMe = asyncHandler(async (req, res) => {
//   const { _id, name, email } = await User.findById(req.user.id);

//   res.status(200).json({
//     id: _id,
//     name,
//     email,
//   });
// });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "30d",
  });
};













module.exports = {
  register,
  login,
};
