import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import EditProfile from "../components/EditProfile";
import Tweet from "../components/Tweet";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { following } from "../redux/userSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [userTweet, setUserTweet] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userTweets = await axios.get(
        import.meta.env.VITE_PRODUCTION
          ? `https://twitter-backend-f4om.onrender.com/api/tweets/user/all/${id}`
          : `http://localhost:3000/api/tweets/user/all/${id}`
      );
      const userProfile = await axios.get(
        import.meta.env.VITE_PRODUCTION
          ? `https://twitter-backend-f4om.onrender.com/api/users/find/${id}`
          : `http://localhost:3000/api/users/find/${id}`
      );

      setUserTweet(userTweets.data);
      setProfile(userProfile.data);
    };
    fetchData();
  }, [currentUser, id]);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axios.put(
          import.meta.env.VITE_PRODUCTION
            ? `https://twitter-backend-f4om.onrender.com/api/users/follow/${id}`
            : `http://localhost:3000/api/users/follow/${id}`,
          {
            id: currentUser._id,
            token: currentUser.token,
          },
          { withCredentials: true }
        );
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        const unfollow = await axios.put(
          import.meta.env.VITE_PRODUCTION
            ? `https://twitter-backend-f4om.onrender.com/api/users/unfollow/${id}`
            : `http://localhost:3000/api/users/unfollow/${id}`,
          {
            id: currentUser._id,
            token: currentUser.token,
          },
          { withCredentials: true }
        );

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="px-6">
        <LeftSideBar />
      </div>
      <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
        <div className="flex justify-between items-center">
          <img
            src={profile?.profilePicture}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full"
          />
          {currentUser._id === id ? (
            <button
              className="px-4 y-2 bg-blue-500 rounded-full text-white"
              onClick={() => setOpen(true)}>
              Edit Profile
            </button>
          ) : currentUser.following.includes(id) ? (
            <button
              className="px-4 y-2 bg-blue-500 rounded-full text-white"
              onClick={handleFollow}>
              Following
            </button>
          ) : (
            <button
              className="px-4 y-2 bg-blue-500 rounded-full text-white"
              onClick={handleFollow}>
              Follow
            </button>
          )}
        </div>
        <div className="mt-6">
          {userTweet &&
            userTweet.map((tweet) => {
              return (
                <div key={tweet._id} className="py-6">
                  <Tweet tweet={tweet} setData={setUserTweet} />
                </div>
              );
            })}
        </div>
      </div>
      <div className="px-6">
        <RightSideBar />
      </div>
      {open && <EditProfile setOpen={setOpen} profile={profile} />}
    </div>
  );
};

export default Profile;
