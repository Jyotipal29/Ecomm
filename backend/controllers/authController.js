const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const asyncHandler = require("express-async-handler");

// const register = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;
//   //hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

// const newUser = new User({
//   username,
//   email,
//   password: hashedPassword,
// });

// const accessToken = jwt.sign(
//   {
//     id: newUser._id,
//   },
//   process.env.JWT_SEC,
//   { expiresIn: "30d" }
// );
// try {
//   const savedUser = await newUser.save();
//   res.status(201).json({ savedUser, accessToken });
// } catch (err) {
//   res.status(500).json(err);
// }
// });

// const login = asyncHandler(async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   const accessToken = jwt.sign(
//     {
//       id: user._id,
//     },
//     process.env.JWT_SEC,
//     { expiresIn: "30d" }
//   );

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({ user, accessToken });
//   } else {
//     res.status(400);
//     throw new Error("invalid users");
//   }
// });



const register = asyncHandler(async (req, res) => {
  //   const { name, email, password } = req.body;
  //   res.json({ message: `hey  ${name} with ${email} and ${password}` });
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  //check if user exist
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
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
    res.status(400);
    throw new Error("invalid error");
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
    res.status(400);
    throw new Error("invalid users");
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
