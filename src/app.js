const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
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
