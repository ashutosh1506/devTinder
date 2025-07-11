import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections found</h1>;
  return (
    <div className="flex flex-col  m-10">
      <div className="flex justify-center">
        <h1 className="text-bold text-6xl bg-base-300  rounded-lg border-dotted border-1 p-2 mb-4 font-semibold text-secondary-content">
          Connections
        </h1>
      </div>

      {connections.map((connection, index) => {
        const { firstName, lastName, gender, age, skills, photoURL } =
          connection;
        return (
          <div key={index}>
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
                  <button className="btn btn-primary w-35 text-base-300">
                    View Profile
                  </button>
                  <button className="btn  bg-warning text-base-content w-35">
                    Remove Profile
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

export default Connections;
