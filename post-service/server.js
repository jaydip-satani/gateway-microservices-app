const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3002;

app.use(bodyParser.json());

let posts = [];
let currentId = 1;

app.post("/posts", (req, res) => {
  const { userId, title, description } = req.body;
  if (!userId || !title || !description)
    return res
      .status(400)
      .json({ message: "userId, title, description are required" });

  const post = {
    id: currentId++,
    userId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  res.status(201).json({ message: "Post created", post });
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.get("/posts/user/:userId", (req, res) => {
  const userPosts = posts.filter((p) => p.userId == req.params.userId);
  res.json(userPosts);
});

app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const { title, description } = req.body;
  if (title) post.title = title;
  if (description) post.description = description;
  res.json({ message: "Post updated", post });
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id);
  res.json({ message: "Post deleted" });
});

app.listen(PORT, () => {
  console.log(`Post service running on port ${PORT}`);
});
