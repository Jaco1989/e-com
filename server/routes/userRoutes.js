import express from "express";
const router = express.Router();
import {
    authUser, registerUser, 
    logoutUser, getUserProfile, 
    updateUserProfile, getUsers, 
    getUserById, deleteUser, 
    updateUser
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js"

// Public Routes
router.post("/auth", authUser)
router.post("/logout", logoutUser)

// Private and Public
router.route("/")
      .post(registerUser)
      .get(protect, admin, getUsers)

router.route("/profile")
      .get(protect, getUserProfile)
      .put(protect, updateUserProfile)

router.route("/:id")
      .delete(protect, admin, deleteUser)
      .get(protect, admin, getUserById)
      .put(protect, admin, updateUser)

export {router as UserRouter}