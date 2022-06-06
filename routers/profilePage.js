const express = require('express');
const router = express.Router();
const { authCookie } = require("../controllers/auth");
const PostModel = require("../models/postModel");

router.get("/", authCookie, async (req, res)=>{
  res.render("profile", {
    user:req.payload
  });
})


router.post("/post", authCookie, async (req, res)=>{
 try {
   // create a post
    const user = req.payload;
    const post = new PostModel({
      ...req.body,
      auther:user._id
    });
    const createdPost = await post.save();
    // add the post to the user
    user.posts.push(createdPost._id);
    const changedUser = await user.save(); 
    // give message back
    res.render("profile", {
      user,
      message:"Your post have been created!",
      postID:createdPost._id
    });
 } catch (error) {
    res.render("errorPage", {error});
 }
})


router.get("/post/edit/:id", authCookie, async (req, res)=>{
  const post = await PostModel.findById(req.params.id);
  res.render("profile", {
    user:req.payload,
    editPost:post
  });
});


router.post("/post/edit/:id", authCookie, async (req, res)=>{
  let post = await PostModel.findById(req.params.id);
  for (const [key, value] of Object.entries(req.body))
    post[key] = value;

  const editPost = await post.save();
  const user = req.payload;

  res.render("profile", {
    user,
    message:"Your post have been edited!",
    postID:editPost._id
  });

});

router.get("/post/delete/:id", authCookie, async(req, res)=>{
  let post = await PostModel.findById(req.params.id);
  const deleted = await post.remove();

  res.render("profile", {
    user:req.payload,
    message:"Your post have been delete!",
    postID:deleted._id
  });
});

module.exports = router;