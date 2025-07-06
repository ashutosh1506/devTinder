const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { profileUpdateValidation } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// All Users Data API
// const getAllUsersData = async (req, res) => {
//     const users = await User.find({});
//     if (!users.length) {
//       res.status(404).send("User Not Found");
//     } else {
//       res.send(users);
//     }
//   };
//   // Delete a user using Id
//   const deleteUser = async (req, res) => {
//     const userId = req.params.userId;

//     try {
//       const user = await User.findByIdAndDelete(userId);
//       if (!user) {
//         res.status(404).send("User Not Found");
//       } else {
//         res.send("User Delelted Successfully");
//       }
//     } catch (err) {
//       res.status(400).send("Error Deleting User: " + err.message);
//     }
//   };

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isAllowed = profileUpdateValidation(req);
    if (!isAllowed) {
      throw new Error("Update of certain fields is not allowed!");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile has been updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error Updating User: " + err.message);
  }
});

module.exports = profileRouter;
