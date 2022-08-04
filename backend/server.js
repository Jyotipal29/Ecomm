const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/cartRouter");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
// app.use("/api/carts", cartRouter);
// app.use("/api/orders", orderRouter);

const port = 8000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
