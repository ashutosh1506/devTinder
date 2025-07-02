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

app.listen(7777, () => {
  console.log("Server Listening on Port 7777");
});
