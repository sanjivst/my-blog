const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur laborum.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
      home: homeStartingContent,
      posts: posts
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

  const post = {
      title: req.body.postTitle,
      content: req.body.postBody
    };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
      if (storedTitle == requestedTitle){
        res.render("post", {title: post.title, body: post.content});
      }
  });
});

app.listen(3000, function(){
  console.log("The server started @ 3000 port");
});
