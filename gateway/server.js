const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const USER_SERVICE_URL = "http://user-service:3001";
const POST_SERVICE_URL = "http://post-service:3002";

app.post("/users", async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users`, req.body);
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "User signup failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/login`, req.body);
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Login failed" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${USER_SERVICE_URL}/users/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: "User not found" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `${USER_SERVICE_URL}/users/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Cannot update user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${USER_SERVICE_URL}/users/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Cannot delete user" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const response = await axios.post(`${POST_SERVICE_URL}/posts`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Post creation failed" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(`${POST_SERVICE_URL}/posts`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch posts" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${POST_SERVICE_URL}/posts/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
});

app.get("/posts/user/:userId", async (req, res) => {
  try {
    const response = await axios.get(
      `${POST_SERVICE_URL}/posts/user/${req.params.userId}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch user posts" });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `${POST_SERVICE_URL}/posts/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Cannot update post" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${POST_SERVICE_URL}/posts/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Cannot delete post" });
  }
});

app.listen(8080, () => {
  console.log("Gateway running on port 8080");
});
