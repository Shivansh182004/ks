const express = require("express");
const app = express();

const farmerRoutes = require("./routes/farmerRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/farmers", farmerRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;
