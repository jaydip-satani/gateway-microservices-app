const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let users = [];
let currentId = 1;

app.post("/users", (req, res) => {
  const { username, password } = req.body;
  const exists = users.find((u) => u.username === username);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = { id: currentId++, username, password };
  users.push(user);
  res.status(201).json({ message: "User created", user });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { username, password } = req.body;
  if (username) user.username = username;
  if (password) user.password = password;
  res.json({ message: "User updated", user });
});

app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.json({ message: "User deleted" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", userId: user.id });
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
