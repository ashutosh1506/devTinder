const validator = require("validator");

const signupValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid!");
  }
};
const profileUpdateValidation = (req) => {
  const data = req.body;
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "photoURL",
    "skills",
  ];

  const isAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
  return isAllowed;
};
module.exports = { signupValidation, profileUpdateValidation };
