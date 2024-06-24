const dotenv = require("dotenv"); 
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// GET /
app.get("/", async (req, res) => {
    res.send("hello, friend!");
  });
  
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
