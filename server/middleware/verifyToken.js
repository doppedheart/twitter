import jwt from "jsonwebtoken";
import { handleError } from "../error.js";

export const verifyToken = (req, res, next) => {
  console.log(req.cookies.access_token);
  const token = req.cookies.access_token;
  if (!token) {
    next(handleError(401, "unauthorized"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(handleError(401, "unauthorized"));
    }
    req.user = user;
    next();
  });
};
