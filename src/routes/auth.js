const express = require("express");
const User = require("../models/user");
const { signupValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Validation of data
    signupValidation(req);
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new instance of the model
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send("Invalid Credentials.");
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials.");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // Cookie will be removed after 8 hrs
      }); // Set the cookie
      res.json({ data: user });
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successful!!!");
});
module.exports = authRouter;
