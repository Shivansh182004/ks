require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const farmerRoutes = require("./src/routes/farmerRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const marketRoutes = require("./src/routes/marketRoutes");

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Inject DB into every request */
app.use(async (req, res, next) => {
  try {
    req.db = await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

/* Routes */
app.use("/api/farmers", farmerRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/market", marketRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("Krishi Sakhi backend running (Native MongoDB)");
});

/* Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
