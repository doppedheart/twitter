import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { handleError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT);
    res.cookie("access_token", token, {
      httpOnly: true,
    });

    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      next(handleError(404, "user not found"));
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      next(handleError(400, "wrong password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
