const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
require("dotenv").config();

// Pushing some hard coded data to database to test our POST API
app.post("/user/signup", async (req, res) => {
  const user = new User({
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    age: 20,
  });
  try {
    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Error Sending Data: " + err.message);
  }
});

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
