const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;

let client;
let db;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("school_management_db");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
  connectDB,
  getDB: () => db,
  closeDB: async () => {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  },
};
