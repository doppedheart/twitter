import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import MainTweet from "../components/MainTweet";
import { useSelector } from "react-redux";
import Signin from "./Signin";
const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSideBar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <MainTweet />
          </div>
          <div className="px-6">
            <RightSideBar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
