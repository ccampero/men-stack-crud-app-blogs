const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  name: String,
  isReadyToCreate: Boolean,
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;