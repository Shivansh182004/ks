const express = require("express");
const {
  registerFarmer,
  loginFarmer
} = require("../models/farmer");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const farmer = await registerFarmer(req.db, req.body);
    res.json({
      message: "Registration successful",
      farmer
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginFarmer(req.db, email, password);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;
