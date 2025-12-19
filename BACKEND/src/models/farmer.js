/**
 * models/farmer.js
 * MongoDB Native Driver based data-access layer
 * NO mongoose, NO schema
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER FARMER ================= */
async function registerFarmer(db, farmerData) {
  const farmers = db.collection("farmers");

  const {
    name,
    email,
    password,
    mobile = "",
    state = "",
    district = "",
    crops = "",
    land = 0
  } = farmerData;

  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  // Check if farmer already exists
  const existingFarmer = await farmers.findOne({ email });
  if (existingFarmer) {
    throw new Error("Farmer already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert farmer
  const result = await farmers.insertOne({
    name,
    email,
    password: hashedPassword,
    mobile,
    state,
    district,
    crops,
    land,
    createdAt: new Date()
  });

  return {
    id: result.insertedId,
    name,
    email
  };
}

/* ================= LOGIN FARMER ================= */
async function loginFarmer(db, email, password) {
  const farmers = db.collection("farmers");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const farmer = await farmers.findOne({ email });
  if (!farmer) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, farmer.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: farmer._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    farmer: {
      id: farmer._id,
      name: farmer.name,
      email: farmer.email
    }
  };
}

/* ================= EXPORT ================= */
module.exports = {
  registerFarmer,
  loginFarmer
};
