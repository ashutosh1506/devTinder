const User = require("../models/user");
const { signupValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

const userSignup = async (req, res) => {
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
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.send("Invalid Credentials.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.send("Invalid Credentials.");
    } else res.send("Login Successful");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const getUserData = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404).send("User Not Found");
  } else {
    res.send(user);
  }
};

// All Users Data API
const getAllUsersData = async (req, res) => {
  const users = await User.find({});
  if (!users.length) {
    res.status(404).send("User Not Found");
  } else {
    res.send(users);
  }
};
// Delete a user using Id
const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send("User Delelted Successfully");
    }
  } catch (err) {
    res.status(400).send("Error Deleting User: " + err.message);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const ALLOWED_UPDATES = ["gender", "age", "photoURL", "skills"];
  try {
    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowed) {
      throw new Error("Update of certain fields is not allowed!");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send("User Updated Successfully");
    }
  } catch (err) {
    res.status(400).send("Error Updating User: " + err.message);
  }
};
module.exports = {
  userSignup,
  userLogin,
  getUserData,
  getAllUsersData,
  deleteUser,
  updateUser,
};
