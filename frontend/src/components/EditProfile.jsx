import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillsInput, setSkillsInput] = useState(
    (user?.skills || []).join(", ")
  );
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoURL, age, gender, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  if (!user) return <p>Loadinf...</p>;
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center my-4 text-2xl">
                Edit Profile
              </h2>

              <div className="flex justify-center">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label className="label">Age</label>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <label className="label">Gender</label>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="label">Skills</label>
                  <input
                    type="text"
                    className="input"
                    value={skillsInput}
                    onChange={(e) => {
                      const input = e.target.value;
                      setSkillsInput(input);
                      setSkills(
                        input
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      );
                    }}
                  />
                  <label className="label">Photo URL</label>
                  <input
                    type="text"
                    className="input"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                  <p className="text-red-500">{error}</p>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        {user && (
          <UserCard
            user={{ firstName, lastName, age, gender, skills, photoURL }}
          />
        )}
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
