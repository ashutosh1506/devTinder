const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send("GET call");
});
app.post("/user", (req, res) => {
  res.send("POST call");
});
app.patch("/user", (req, res) => {
  res.send("PATCH call");
});
app.delete("/user", (req, res) => {
  res.send("DELETE call");
});
app.listen(7777, () => {
  console.log("Server Listening on Port 7777");
});
