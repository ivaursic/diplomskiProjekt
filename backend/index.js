// index.js
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Za parsiranje JSON podataka

// MongoDB URI
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// POST endpoint za umetanje podataka u MongoDB
app.post("/add-error", async (req, res) => {
  try {
    const { error } = req.body;
    const db = client.db("lexappDB");
    const collection = db.collection("failures");

    const result = await collection.insertOne({
      error,
      timestamp: new Date(),
    });

    res
      .status(200)
      .json({ message: `Inserted error with ID: ${result.insertedId}` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to insert error", error: err.message });
  }
});

// GET endpoint za dohvat svih podataka iz MongoDB
app.get("/errors", async (req, res) => {
  try {
    const db = client.db("lexappDB");
    const collection = db.collection("failures");

    const documents = await collection.find().toArray();
    res.status(200).json(documents);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: err.message });
  }
});

// Pokretanje servera
connectToDb();
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
