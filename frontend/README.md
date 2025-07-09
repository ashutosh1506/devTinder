## DevTinder UI

# Steps

- Created vite@latest
- Setup Tailwind
- Setup DaisyUI
- created Navbar component
- Setup Routing in App.jsx
- Created Body Component
  - Setup child components in this
- Created Login Component
- Installed axios
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

# Components

- Navbar
- Login
- Profile
- Body
- Footer

# Libraries installed

1. Tailwind CSS
2. DaisyUI
3. react-router-dom
4. Axios
5. cors
