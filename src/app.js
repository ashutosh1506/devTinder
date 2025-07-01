const express = require("express");
const app = express();

app.get("/user/:userId/:name", (req, res) => {
  console.log({ ...req.params });

  res.send("GET call");
});
app.get("/user", (req, res) => {
  console.log({ ...req.query });

  res.send("GET call");
});

app.get(/.*fly$/, (req, res) => {
  res.send("Regex call tested");
});

app.listen(7777, () => {
  console.log("Server Listening on Port 7777");
});
