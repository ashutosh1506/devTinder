const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const Admin = require("./models/admin");
require("dotenv").config();

app.use(express.json());

// Pushing some hard coded data to database to test our POST API
app.post("/user/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Error Sending Data: " + err.message);
  }
});
// Creating Admin post API
app.post("/admin/signup", async (req, res) => {
  const admin = new Admin(req.body);
  try {
    await admin.save();
    res.send("Admin Added Successfully!");
  } catch (err) {
    res.status(400).send("Error Sending Data: " + err.message);
  }
});
// User Data Get API
app.get("/user/getData", async (req, res) => {
  const userEmail = req.body.email;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    res.status(404).send("User Not Found");
  } else {
    res.send(user);
  }
});

// All Users Data API
app.get("/user/getAllData", async (req, res) => {
  const userId = req.body._id;
  const users = await User.find({ _id: userId });
  if (!users.length) {
    res.status(404).send("User Not Found");
  } else {
    res.send(users);
  }
});
// Delete a user using Id
app.delete("/user/deleteUser", async (req, res) => {
  const userId = req.body._id;

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
});
// Update a user using Id
app.put("/user/updateUser/:userId", async (req, res) => {
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
});
//Update a user using email Id with patch API
app.patch("/user/updateUser/:email", async (req, res) => {
  const email = req.params.email;
  const data = req.body;
  const ALLOWED_UPDATES = ["gender", "age", "photoURL", "skills"];
  try {
    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowed) {
      throw new Error("Update of certain fields is not allowed!");
    }
    const user = await User.findOneAndUpdate({ email: email }, data, {
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
});
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
