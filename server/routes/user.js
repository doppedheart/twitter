import {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
} from "../controller/user.js";
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
//get a single user
router.get("/find/:id", getUser);
// update a user
router.put("/:id", verifyToken, updateUser);
//delete a user
router.delete("/:id", verifyToken, deleteUser);
//follow
router.put("/follow/:id", verifyToken, follow);
//unfollow
router.put("/unfollow/:id", verifyToken, unfollow);

export default router;
