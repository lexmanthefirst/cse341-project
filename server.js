//Require env
require("dotenv").config();

// Importing required modules
const express = require("express");
//Express app initialization
const app = express();
const routes = require("./routes");
const { connectDB } = require("./data/database");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}
startServer();
