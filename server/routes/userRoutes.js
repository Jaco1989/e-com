import express from "express";
const router = express.Router();
import {
    authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(getUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.post("/logout", logoutUser)

router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser)

export {router as UserRouter}