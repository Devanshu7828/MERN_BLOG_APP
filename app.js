require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// DATABASE
require("./database/database");

// GLOBAL MIDDLEWARE
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(morgan("dev"));
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello from the srver");
});
app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/posts", require("./routes/postRoutes"));

module.exports = app;
