- Order of Routes is very important

# Dynamic Routes

- "/ab?c" : this means b is optional (route can be: /abc or /ac)
- "user?userId=101&name=Ashu : to make a query string, use & and = to separate key and value. This is a query string. we can fetch it by using request.query in the route handler function.
- "/user/:userId" : this is a parameterized route. We can fetch the value of userId by using req.params.userId in the route handler function.
- "/ab+c" : abbbc or abc or abbbbbbbc
- "/ab\*c" : abdddsdc or abc or abashuc
- Regex : /.\*fly$/ : this means route must end with fly.

# Connecting to database

- install mongoose package
  ![alt text](/Readme%20Images/image2.png)
  ![alt text](/Readme%20Images/image.png)

# JSON Middleware

- To convert json object to js object we need to use json middleware provided by express as vsCode understands js object not json object.
- app.use(express.json());

# npm validator

- npm i validator
- Check for validations like correct email, strong password, etc.

# Encrypting Passwords

- npm i bcrypt
- For hashing the password :

  - const hashedPassword = await bcrypt.hash(password, 10);

- For comparing the password :
  - const isValid = await bcrypt.compare(password, hashedPassword);-

## Cookies

# To send a cookie:

- res.cookie("token", token);

# To get a cookie:

- We need to use a middleware like cookie-parser to get the cookie.
- npm i cookie-parser
- const cookies = req.cookies.token;
- app.use(cookieParser()); (app.js)

# schema.pre("save", function(){});

- to handle cases before saving to databases

# ref and populate

- To create relationship between schemas
- ref : "Schema_Name"
- Read about ref and populate : https://mongoosejs.com/docs/populate.html

# Query Operators

- $nin, $ne, $or, $and, etc
- Read from - https://www.mongodb.com/docs/manual/reference/operator/query/

# Pagination

- .skip() : skip = (page-1)\*limit
- .limit()
- /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
- /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
- /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
