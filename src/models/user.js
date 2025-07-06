const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 10,
    },
    lastName: {
      type: String,
      maxLength: 10,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    photoURL: {
      type: String,
      default:
        "https://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a valid photo URL");
        }
      },
    },
    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 5;
        },
        message: "Max 5 Skills are allowed!",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(
    userInputPassword,
    hashedPassword
  );
  return isValidPassword;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
