require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

let client;
let db;

async function connectDB() {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();

  db = client.db("krishisakhi");
  console.log("✅ MongoDB connected (Native Driver)");

  return db;
}

module.exports = connectDB;
