const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let posts = [];

app.post("/posts", (req, res) => {
  const post = { id: Date.now().toString(), ...req.body };
  posts.push(post);
  res.status(201).json(post);
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.get("/posts/user/:userId", (req, res) => {
  const userPosts = posts.filter((p) => p.userId === req.params.userId);
  res.json(userPosts);
});

app.put("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts[index] = { ...posts[index], ...req.body };
  res.json(posts[index]);
});

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts.splice(index, 1);
  res.json({ message: "Post deleted successfully" });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Post Service running on port ${PORT}`));
