import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(user){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      })
    }else{
      res.status(401)
      throw new Error("Invalid Email or Password")
    }
});

const registerUser = asyncHandler(async (req, res) => {
    res.send("register")
});

const logoutUser = asyncHandler(async (req, res) => {
    res.send("logout")
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user profile")
});

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update user profile")
});

const getUsers = asyncHandler(async (req, res) => {
    res.send("get users")
});

const getUserById = asyncHandler(async (req, res) => {
    res.send("get user id")
});  

const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete")
});

const updateUser = asyncHandler(async (req, res) => {
    res.send("update user")
});

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser}