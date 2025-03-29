const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const { connectTOMongoDB } = require("./connection");

const app = express();
const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URL;
connectTOMongoDB(url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
