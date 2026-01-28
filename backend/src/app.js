// Express App

const express = require("express");
const cors = require("cors");

const itemsRoutes = require("./http/routes/items.routes");
const usersRoutes = require("./http/routes/users.routes");
const timeRoutes = require("./http/routes/time.routes");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/items", itemsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/time", timeRoutes);

module.exports = app;
