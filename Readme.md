# Order of Routes is very important

# Dynamic Routes

- "/ab?c" : this means b is optional (route can be: /abc or /ac)
- "user?userId=101&name=Ashu : to make a query string, use & and = to separate key and value. This is a query string. we can fetch it by using request.query in the route handler function.
- "/user/:userId" : this is a parameterized route. We can fetch the value of userId by using req.params.userId in the route handler function.
- "/ab+c" : abbbc or abc or abbbbbbbc
- "/ab\*c" : abdddsdc or abc or abashuc
- Regex : /.\*fly$/ : this means route must end with fly.

# Connecting to database

- Connect to Database first and then start the server
  app.js
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

database.js
const mongoose = require("mongoose");

const connectDB = async () => {
await mongoose.connect(
"mongodb+srv://gaashu001:ashu12345@cluster0.ro8bqmn.mongodb.net/"
);
};

module.exports = connectDB;
![alt text](image.png)
