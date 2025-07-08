const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Check valid status
      const allowed_status = ["interested", "ignored"];
      if (!allowed_status.includes(status))
        throw new Error("Invalid Status Type!");
      // User
      const toUser = await User.findById({ _id: toUserId });
      if (!toUser) return res.status(404).json({ message: "User not Exist" });

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest)
        return res
          .status(409)
          .json({ message: "Connection Request already exist!" });

      const sendConnection = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      await sendConnection.save();
      res.json({
        message: `${req.user.firstName} ${status} ${toUser.firstName} `,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = requestRouter;
