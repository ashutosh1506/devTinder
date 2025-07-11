import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res?.data));
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="text-3xl flex justify-center w-80 my-20 rounded-sm h-15 items-center mx-auto ">
        No More Users Found
      </h1>
    );
  return (
    <div className="flex justify-center my-10 ">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
