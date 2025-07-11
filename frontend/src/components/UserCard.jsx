import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  if (!user) return null;
  const { _id, firstName, lastName, photoURL, age, gender, skills } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-lg ">
      <figure className="px-10 pt-10">
        <img src={photoURL} alt="Shoes" className="rounded-xl w-full" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{gender + "   " + age} </p>}
        {skills && <p> Skills : {skills.join(",")}</p>}
        <div className="card-actions mb-4">
          <button
            className="btn btn-secondary text-base-300"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-primary text-base-300"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
