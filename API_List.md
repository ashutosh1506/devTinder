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

- Status: [interested, ignored, accepted, rejected]
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

# userRouter

- GET /connections
- GET /user/requests/recieved
- GET /user/feed - Gets you the profiles of other users
