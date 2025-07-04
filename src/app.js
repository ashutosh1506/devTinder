const express = require("express");
const app = express();
const connectDB = require("./config/database");
const {
  userSignup,
  getUserData,
  getAllUsersData,
  deleteUser,
  updateUser,
} = require("./routes/userRoutes");
require("dotenv").config();

app.use(express.json());

// Signup API
app.post("/user/signup", userSignup);
app.get("/user/getUserData/:userId", getUserData);
app.get("/user/getAllData", getAllUsersData);
app.delete("/user/deleteUser/:userId", deleteUser);
app.patch("/user/updateUser/:userId", updateUser);

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
