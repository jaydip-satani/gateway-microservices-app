const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

app.post("/users", (req, res) => {
  const user = { id: Date.now().toString(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
