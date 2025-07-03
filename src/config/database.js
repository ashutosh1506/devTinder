const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gaashu001:ashu12345@cluster0.ro8bqmn.mongodb.net/"
  );
};

module.exports = connectDB;
