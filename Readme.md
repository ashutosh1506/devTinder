- Order of Routes is very important

# Dynamic Routes

- "/ab?c" : this means b is optional (route can be: /abc or /ac)
- "user?userId=101&name=Ashu : to make a query string, use & and = to separate key and value. This is a query string. we can fetch it by using request.query in the route handler function.
- "/user/:userId" : this is a parameterized route. We can fetch the value of userId by using req.params.userId in the route handler function.
- "/ab+c" : abbbc or abc or abbbbbbbc
- "/ab\*c" : abdddsdc or abc or abashuc
- Regex : /.\*fly$/ : this means route must end with fly.

# Connecting to database

![alt text](/Readme%20Images/image2.png)
![alt text](/Readme%20Images/image.png)

# JSON Middleware

- To convert json object to js object we need to use json middleware provided by express as vsCode understands js object not json object.
- app.use(express.json());
