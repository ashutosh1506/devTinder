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

- GET /connections
- GET /user/requests/recieved
- GET /user/feed - Gets you the profiles of other users
