import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logout,
} from "../redux/userSlice";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        username,
        password,
      },{
        withCredentials: true,
      });
      console.log(Cookies.get("access_token"));
      dispatch(loginSuccess(res.data));
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      dispatch(loginFailed());
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        username,
        password,
        email,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      dispatch(loginFailed());
    }
  };

  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">
        Sign in to clone twitter
      </h2>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="text-xl py-2 rounded-full px-4"
        placeholder="username"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="text-xl py-2 rounded-full px-4"
        placeholder="password"
      />
      <button
        onClick={(e) => handleLogin(e)}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        type="submit">
        Sign in
      </button>
      <p className="text-center text-xl">Don't have an account sign Up here</p>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="text-xl py-2 rounded-full px-4"
        placeholder="username"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        className="text-xl py-2 rounded-full px-4"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="text-xl py-2 rounded-full px-4"
        placeholder="password"
      />
      <button
        onClick={(e) => handleSignup(e)}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        type="submit">
        Sign up
      </button>
    </form>
  );
};

export default Signin;
