const express = require("express");
const morgan = require("morgan");
const app = express();

const userRoutes = require("./api/routes/user.routes");
const ticketRoutes = require("./api/routes/ticket.routes");

require("./api/asociations/asociation");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

module.exports = app;
