const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRouter");

connectDB();

const app = express();
app.use(cors());

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
