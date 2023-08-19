import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislikeTweet,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
} from "../controller/tweet.js";
const router = express.Router();

router.post("/", verifyToken, createTweet);
router.delete("/:id", verifyToken, deleteTweet);
router.put("/:id/like", likeOrDislikeTweet);
router.get("/timeline/:id", getAllTweets);
router.get("/user/all/:id", getUserTweets);
router.get("/explore", getExploreTweets);
export default router;
