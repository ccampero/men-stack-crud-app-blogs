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

const Blog = require("./models/blogs.js");

//middleware 
app.use(express.urlencoded({ extended: false }));
// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
      });

// GET /blogs


app.get("/blogs", async (req, res) => {
    const allBlogs = await Blog.find();
    res.render("blogs/index.ejs", { blogs: allBlogs });
  });
  
app.get("/blogs/new",  (req, res) => {
    res.render("blogs/new.ejs");
  });

  
  

  // POST /fruits
  app.post("/blogs", async (req, res) => {
    if (req.body.isReadyToCreate === "on") {
      req.body.isReadyToCreate = true;
    } else {
      req.body.isReadyToCreate = false;
    }
    await Blog.create(req.body);
    res.redirect("/blogs");
  });
  
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
