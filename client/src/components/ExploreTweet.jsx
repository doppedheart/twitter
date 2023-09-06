import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Tweet from "./Tweet";
const ExploreTweet = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [explore, setExplore] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweet = await axios.get(
          import.meta.env.PRODUCTION
            ? "https://twitter-backend-f4om.onrender.com/api/tweets/explore"
            : "http://localhost:3000/api/tweets/explore",
          { withCredentials: true }
        );
        setExplore(exploreTweet.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser._id]);
  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div key={tweet._id} >
              <Tweet tweet={tweet} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweet;
