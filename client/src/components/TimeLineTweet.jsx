import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import Tweet from "./Tweet";

const TimeLineTweet = () => {
  const [timeLineTweet, setTimeLineTweet] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeLine = await axios.get(
          import.meta.env.VITE_PRODUCTION
            ? `https://twitter-backend-f4om.onrender.com/api/tweets/timeline/${currentUser._id}`
            : `http://localhost:3000/api/tweets/timeline/${currentUser._id}`
        );
        setTimeLineTweet(timeLine.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser._id]);
  return (
    <div className="mt-6">
      {timeLineTweet &&
        timeLineTweet.map((tweet) => {
          return (
            <div key={tweet._id} className="py-6">
              <Tweet tweet={tweet} setData={setTimeLineTweet} />
            </div>
          );
        })}
    </div>
  );
};

export default TimeLineTweet;
