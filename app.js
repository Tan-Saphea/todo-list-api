const express = require("express");
const todoRoutes = require("./routes/todo.route");
const errorHandler = require("./helpers/error-handler");

const app = express();

app.use(express.json());

// routes
app.use("/api/todos", todoRoutes);

// error middleware (must be last)
app.use(errorHandler);

module.exports = app;
