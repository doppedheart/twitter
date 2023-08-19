import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {logout} from '../redux/userSlice'
const LeftSideBar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/">
          <div className="flex items-center space-x-2 px-2 py-3 hover:bg-slate-200 rounded-full cursor-pointer">
            <HomeIcon fontSize="large" />
            Home
          </div>
        </Link>
        <Link to="/explore">
          <div className="flex items-center space-x-2 px-2 py-3 hover:bg-slate-200 rounded-full cursor-pointer">
            <TagIcon fontSize="large" />
            Explore
          </div>
        </Link>
        <Link to="/profile/">
          <div className="flex items-center space-x-2 px-2 py-3 hover:bg-slate-200 rounded-full cursor-pointer">
            <PersonIcon fontSize="large" />
            Profile
          </div>
        </Link>
      </div>
        <div className="flex justify-between">
            <div>
                <p className="font-bold">username</p>
                <p className="fond-bold">@username</p>
            </div>
            <Link to="signin">
                <button className="bg-red-500 px-4 py-2 text-white rounded-full" onClick={handleLogout}>logout</button>
            </Link>
        </div>
    </div>
  );
}

export default LeftSideBar