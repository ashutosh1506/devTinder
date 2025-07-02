const adminAuth = (req, res, next) => {
  console.log("Authenticating admin");
  const token = "abc";
  const isTokenValid = token === "abc";
  if (!isTokenValid) {
    res.status(401).send("Admin is Unauthorized!");
  } else next();
};

const userAuth = (req, res, next) => {
  console.log("Authenticating admin");
  const token = "abc";
  const isTokenValid = token === "abc";
  if (!isTokenValid) {
    res.status(401).send("User is Unauthorized!");
  } else next();
};
module.exports = { adminAuth, userAuth };
