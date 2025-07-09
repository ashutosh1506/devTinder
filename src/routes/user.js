const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "skills", "age"]);

    res.json({
      message: "Data Fetched Successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json({ messgae: err.messgae });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      status: "accepted",
    }).populate("fromUserId toUserId", [
      "firstName",
      "lastName",
      "skills",
      "age",
    ]);

    const data = connections.map((connection) => {
      if (connection.fromUserId._id.toString() === loggedInUser._id.toString())
        return connection.toUserId;
      return connection.fromUserId;
    });
    res.json({
      message: "Connections fetched successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({ messgae: err.messgae });
  }
});
module.exports = userRouter;
