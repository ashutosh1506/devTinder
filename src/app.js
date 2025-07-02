const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

// auth middleware handler
app.use("/admin", adminAuth);

app.post("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});
app.post("/admin/deleteUser", (req, res) => {
  res.send("User Deleted");
});
app.get("/user", userAuth, (req, res, next) => {
  res.send("Welcome To NodeJs World");
});

// Error Handler
app.get("/userData", userAuth, (req, res, next) => {
  throw new Error("Error!!!!!!");
  res.send("Welcome To NodeJs World");
  // try {
  //   throw new Error("Error!!!!!!");
  //   res.send("Welcome To NodeJs World");
  // } catch (error) {
  //   res.status(500).send("Something went wrong");
  // }
});
app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("Internal Server Error");
});

app.listen(7777, () => {
  console.log("Server Listening on Port 7777");
});
