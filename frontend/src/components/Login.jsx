import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center my-4 text-2xl">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <div className="flex justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              {!isLoginForm && (
                <>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-red-500">{error}</p>
              <button
                className="btn btn-primary mt-4"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
              <p
                className="text-content cursor-pointer text-sm hover:text-gray-400 mx-auto mt-2"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "New User? SignUp" : "Existing User? Login"}
              </p>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
