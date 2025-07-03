const express = require("express");
const app = express();
const connectDB = require("./config/database");
require("dotenv").config();

// Connect to Database first and then start the server
connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} `);
    });
  })
  .catch((err) => {
    console.log("Database Connectivity Error");
  });
