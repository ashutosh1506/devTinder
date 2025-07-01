const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Kids");
});

app.use("/test", (req, res) => {
  res.send("Welcome Users");
});
app.listen(7777, () => {
  console.log("Server Listening on Port 7777");
});
