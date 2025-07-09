## DEvTinder APIs

# authRouter

- POST /signup
- POST /login
- POST /logout

# profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestRouter

- POST /request/send/:status/:userId
  - Status: [interested, ignored]
- POST /request/review/:status/:requestId
  - Status: [accepted, rejected]

# userRouter

- GET /user/requests/received: Get all the pending connection request for the loggedIn User
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users
