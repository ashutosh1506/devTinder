import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) return <h1>No Requests Found</h1>;
  return (
    <div className="flex flex-col  m-10">
      <div className="flex justify-center">
        <h1 className="text-bold text-6xl bg-base-300  rounded-lg border-dotted border-1 p-2 mb-4 font-semibold text-secondary-content">
          Connection Requests
        </h1>
      </div>

      {requests.map((request) => {
        const { _id, firstName, lastName, gender, age, skills, photoURL } =
          request.fromUserId;
        return (
          <div key={_id}>
            <div className="card card-side shadow-sm m-2 bg-base-300 rounded-sm h-50 w-1/2 mx-auto">
              <figure>
                <img className="w-40" src={photoURL} alt="Movie" />
              </figure>
              <div className="card-body flex flex-row justify-around">
                <div>
                  <h2 className="card-title text-2xl pb-4">
                    {firstName + " " + lastName}
                  </h2>
                  {skills.length > 0 && <p>{"Skills: " + skills}</p>}
                  {age && <p>{"Age: " + age}</p>}
                  {gender && <p>{"Gender: " + gender}</p>}
                </div>
                <div className="card-actions justify-center flex flex-col">
                  <button className="btn btn-accent w-35 text-base-300">
                    Accept
                  </button>
                  <button className="btn  bg-error text-base-content w-35">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
