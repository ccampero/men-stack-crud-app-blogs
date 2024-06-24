const dotenv = require("dotenv"); 
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 


const app = express();
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Blog = require("./models/blogs.js");

//middleware 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 
app.use(express.static('models'));

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

  app.get("/blogs/:blogId", async (req, res) => {
    const foundBlog = await Blog.findById(req.params.blogId);
    res.render("blogs/show.ejs", { blog: foundBlog});
  });  
  
  app.delete("/blogs/:blogId", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.blogId)
    res.redirect("/blogs");
  });
  
  app.get("/blogs/:blogId/edit", async (req, res) => {
    const foundBlog = await Blog.findById(req.params.blogId);
    res.render("blogs/edit.ejs", {
        blog: foundBlog,
    });
  });

  // POST /blogs
  app.post("/blogs", async (req, res) => {
    if (req.body.isReadyToCreate === "on") {
      req.body.isReadyToCreate = true;
    } else {
      req.body.isReadyToCreate = false;
    }
    await Blog.create(req.body);
    res.redirect("/blogs");
  });
 
  // server.js

app.put("/blogs/:blogId", async (req, res) => {
    // Handle the 'isReadyToCreate' checkbox data
    if (req.body.isReadyToCreate === "on") {
      req.body.isReadyToCreate = true;
    } else {
      req.body.isReadyToCreate = false;
    }
    
    // Update the blog in the database
    await Blog.findByIdAndUpdate(req.params.blogId, req.body);
  
    // Redirect to the blog's show page to see the updates
    res.redirect(`/blogs/${req.params.blogId}`);
  });
  
  
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
