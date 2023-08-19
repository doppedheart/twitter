import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Tweet from "./Tweet";
const TimeLineTweet = () => {
  const [timeLineTweet, setTimeLineTweet] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeLine = await axios.get(
          `http://localhost:3000/api/tweets/timeline/${currentUser._id}`
        );
        setTimeLineTweet(timeLine.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser._id]);
  console.log("timeLine", timeLineTweet);
  return <div className="mt-6">
    {timeLineTweet && timeLineTweet.map((tweet)=>{
        return(
            <div key={tweet._id} className="py-6">
                <Tweet tweet={tweet} setData={setTimeLineTweet}/>
            </div>
        )
    })}
  </div>;
};

export default TimeLineTweet;
