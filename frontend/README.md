# DevTinder UI

## Steps

- Created vite@latest
- Setup Tailwind
- Setup DaisyUI
- created Navbar component
- Setup Routing in App.jsx
- Created Body Component
  - Setup child components in this
- Created Login Component
- Installed axios - for making API call to backend
- Installed cors in backend
  - const cors = require("cors");
  - app.use(cors());
  - To whitelist our origin (to set cookie in fronend):
    - app.use(cors({
      origin: "http://localhost:5173",
      credentials: true,
      })
      );
    - whenever you are making API Call so pass {withCredentials: true} =>
      - const res = await axios.post(
        "http://localhost:7777/login",{email, password,}, { withCredentials: true });
- Installed @redux/toolkit + react-redux => configureStore => Provider => createSlice => Add Reducer to store
- Navbar should update as soon as user logs in
- Refactor code to add constants file
- if token is not present, redirect user to login page
- Logout Functionality
- Profile Feature

## Components

- Navbar
- Login
- Profile
- Body
- Footer

## Libraries installed

1. Tailwind CSS
2. DaisyUI
3. react-router-dom
4. Axios
5. cors
6. Redux/toolkit
