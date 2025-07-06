const express = require("express");
const requestRouter = express.Router();

requestRouter.post("/request/send/interested/:userId", async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " has sent a connection request");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = requestRouter;
