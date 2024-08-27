import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { COOKIE_OPTIONS } from "../utils/constant.js";
import jwt from "jsonwebtoken";

//! generating the refresh and accesstoken
const generateAcessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    //? this is for it doest not throw error where where we put the reuqired on the field

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while generating access and refresh token"
        )
      );
  }
};

//! creating the user when it came for first time

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json(new ApiError(400, "Please provide all required fields."));
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res
      .status(409)
      .json(new ApiError(409, "User already exists , Please Sign in."));
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password ");

  if (!createdUser) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registering user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User Register Successfully", createdUser));
});

//! login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json(new ApiError(400, "Please provides all required fields "));
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(401).json(new ApiError(401, "Invalid Email/Passowrd "));
  }

  const validPassword = await existingUser.isPasswordCorrect(password);

  if (!validPassword) {
    return res.status(401).json(new ApiError(401, "Invalid Email/Password"));
  }

  const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
    existingUser._id
  );

  const loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(new ApiResponse(200, "User LoggedIn Successfully", loggedInUser));
});

//! logging out the user

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      //?If set to true, returns the modified document rather than the original
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, "User logout Successfully"));
});

//! fetch all user

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) {
    return res
      .status(401)
      .json(new ApiError(401, "Error while getting the user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "All Users Fetched Successfully ", users));
});

//! refreshing access token

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken = req.cookies?.refreshToken;
  //console.log(`incomming refresh token `,incommingRefreshToken);

  if (!incommingRefreshToken) {
    return res
      .status(401)
      .json(new ApiError(401, "Session Expired, Please Login"));
  }

  const decodeRefreshToken = await jwt.verify(
    incommingRefreshToken,
    process.env.REFRESHTOKEN_SECRET
  );
  //console.log(decodeRefreshToken);

  try {
    const user = await User.findById(decodeRefreshToken?._id);

    if (!user) {
      return res.status(401).json(new ApiError(401, "Unauthorized Access"));
    }

    //console.log(`old refreshtoken`, user.refreshToken);

    if (incommingRefreshToken !== user.refreshToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Token is expired or used"));
    }

    const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
      user._id
    );
    //console.log(`new refreshToken`, refreshToken)
    //console.log(`new accessToken`, accessToken)

    return res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(
        new ApiResponse(200, "RefreshToken refreshed", {
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid Refresh Token"));
  }
});

//! getting current user profile

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user?._id).select("-password -refreshToken");

  // if(!user){
  //     return res
  //     .status(401)
  //     .json(new ApiError(401 , "Please login"));
  // }

  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched Successfullt", req.user));
});

//! change current password

const changeOldPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isOldPasswordCorrect) {
    return res.status(400).json(new ApiError(400, "Password is Invalid."));
  }

  user.password = newPassword;

  await user.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password change Successfully.", {}));
});

//! updating the use info

const updateUserProfileInfo = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const newUsername = username?.trim() === "" ? req.user?.username : username;
  const newEmail = email?.trim() === "" ? req.user?.email : email;

  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username : newUsername,
          email : newEmail,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");
  
    return res
      .status(200)
      .json(new ApiResponse(200, "Profile Update Successfully", user));

  } catch (error) {
        return res
        .status(401)
        .json(new ApiError(401, "Invalid user"));
  }
});

const deleteUserById = asyncHandler(async(req, res)=>{
    const {id} = req.params;

    if(!id){
        return res
        .status(401)
        .json(new ApiError(401 , "Id not found "))
    }

    const user = await User.findById(id);

    if(!user){
        return res
        .status(404)
        .json(new ApiError(404 , "User not found"));
    }

    if(user.isAdmin){
        return res
        .status(400)
        .json(new ApiError(400, "Cannot delete Admin user"))
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User Deleted Successfully" , deletedUser))


})





export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUser,
  refreshAccessToken,
  getCurrentUserProfile,
  changeOldPassword,
  updateUserProfileInfo,
  deleteUserById
};
