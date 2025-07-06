const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// Connect to Database first and then start the server
connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} `);
    });
  })
  .catch((err) => {
    console.log("Database Connectivity Error");
  });
