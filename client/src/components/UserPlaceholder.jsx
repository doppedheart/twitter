import axios from "axios";
import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(
          import.meta.env.PRODUCTION
            ? `https://twitter-backend-f4om.onrender.com/api/users/find/${id}`
            : `http://localhost:3000/api/users/find/${id}`
        );
        setUserData(userProfile.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
