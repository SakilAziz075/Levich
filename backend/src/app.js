// Express App

const express = require("express");
const cors = require("cors");
const itemsRoutes = require("./http/routes/items.routes");
const usersRoutes = require("./http/routes/users.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/items", itemsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
