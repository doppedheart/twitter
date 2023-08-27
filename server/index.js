import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import tweetRouter from "./routes/tweet.js";

dotenv.config();
const app = express();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch((error) => {
      console.log(error);
    });
};

app.use(cookieParser());
app.use(express.json());

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tweets", tweetRouter);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${process.env.PORT}`);
});
