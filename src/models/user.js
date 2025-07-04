const mongoose = require("mongoose");

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
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!/[#@\$%\^&\*]/.test(value)) {
          throw new Error(
            "Password must contain at least one special character"
          );
        }
      },
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
      minLength: 0,
      maxLength: 3,
    },
    photoURL: {
      type: String,
      default:
        "https://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
