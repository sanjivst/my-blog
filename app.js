const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lorem ipsum dolor sit amet";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur laborum.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sanjiv:Sanjiv@mongodb@cluster0-o3ofi.mongodb.net/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postsSchema = {
  title: {
    type: String,
    required: true
  },
  content: {
  type: String,
  required: true
}
};

const Post = mongoose.model("Post", postsSchema);

app.get("/", function(req, res){
  Post.find({},function(err, posts){
    res.render("home", {
        home: homeStartingContent,
        posts: posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {about: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contact: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody
    });
    post.save(function(err){
      if(!err){
        res.redirect("/");
      }
    });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      body: post.content
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("The server has started successfully.");
});
