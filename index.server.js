const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");

// require routes
const authRoutes = require("./src/routes/auth");

// env config
env.config();

// mongo db connection
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("mongodb connection err", err);
  });

app.get("/", (req, res) => {
  res.send("connected successfully...");
});

app.use(express.json());
app.use("/api", authRoutes);

app.listen(3002, () => {
  console.log("working");
});
