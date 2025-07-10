const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { profileUpdateValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

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
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const loggedInUser = req.user;
    if (!oldPassword || !newPassword)
      throw new Error("Both fields are required!");
    const isValidPassword = await loggedInUser.validatePassword(oldPassword);
    if (!isValidPassword) throw new Error("Password not matched!");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Password Updated Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = profileRouter;
