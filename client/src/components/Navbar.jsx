import React, { useState } from "react";
import logo from "./twitter-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import UserPlaceholder from "./UserPlaceholder";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <div className="grid grid-col-1 md:grid-cols-4 my-5 justify-center">
      <div className="mx-auto md:mx-0">
        <img src={logo} alt="twitter logo" width={"40px"} className="ml-8" />
      </div>
      <div className="col-span-2 md:border-x-2 md:border-slate--200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </h2>
          <StarPurple500Icon />
        </div>
      </div>
      <div className="px-0 md:px-6 mx-auto">
        <SearchIcon className="absolute m-2" />
        <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
      </div>
    </div>
  );
};

export default Navbar;
