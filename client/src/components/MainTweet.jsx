import React, { useState } from "react";
import TimeLineTweet from "./TimeLineTweet";
import { useSelector } from "react-redux";
import axios from "axios";
const MainTweet = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tweetText, setTweetText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTweet = await axios.post(
        import.meta.env.VITE_PRODUCTION
          ? "https://twitter-backend-f4om.onrender.com/api/tweets"
          : "http://localhost:3000/api/tweets",
        {
          userId: currentUser._id,
          description: tweetText,
          token: currentUser.token,
        },
        { withCredentials: true }
      );
      console.log(newTweet);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}
      <form action="" className="border-b-2 pb-6">
        <textarea
          type="text"
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="what's happening"
          className="bg-slate-200 rounded-lg w-full p-2"></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">
          Tweet
        </button>
      </form>
      <TimeLineTweet />
    </div>
  );
};

export default MainTweet;
