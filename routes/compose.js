const router = require("express").Router();
const { mongo } = require("mongoose");
const { count } = require("../models/blogModel");
const Blog = require("../models/blogModel");

router.get("/compose", (req, res) => {
  res.render("blog/compooseblog");
});

// geeting data from the form of compooseblog.ejs
router.post("/compose", async (req, res, next) => {
  console.log(req.body);
  const { title, content } = req.body;

  if (!title || !content) {
    return res.send("Plesse enter all data");
  }

  const newBlog = new Blog({ title, content });
  // save to DB
  try {
    const saveBlog = await newBlog.save();
    const count = await saveBlog.collection.countDocuments();

  
    res.redirect("/blog");
  } catch (err) {
    console.log("Error saving data to db", err);
  }
});

module.exports = router;
