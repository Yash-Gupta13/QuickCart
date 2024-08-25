import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { COOKIE_OPTIONS } from "../utils/constant.js";
import jwt from 'jsonwebtoken'

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


const refreshAccessToken = asyncHandler(async(req, res)=>{
    const incommingRefreshToken = req.cookies?.refreshToken;
    //console.log(`incomming refresh token `,incommingRefreshToken);

    if (!incommingRefreshToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Session Expired, Please Login"));
    }

    const decodeRefreshToken = await jwt.verify(incommingRefreshToken , process.env.REFRESHTOKEN_SECRET);
    //console.log(decodeRefreshToken);

    try {
        const user = await User.findById(decodeRefreshToken?._id);
    
        if(!user){
            return res
            .status(401)
            .json(new ApiError(401 , "Unauthorized Access"));
        }

        //console.log(`old refreshtoken`, user.refreshToken);
    
        if(incommingRefreshToken !== user.refreshToken){
            return res
            .status(401)
            .json(new ApiError(401 , "Token is expired or used"));
        }

        const {accessToken , refreshToken} = await generateAcessAndRefreshToken(user._id);
        //console.log(`new refreshToken`, refreshToken)
        //console.log(`new accessToken`, accessToken)

        return res
        .status(200)
        .cookie("accessToken" , accessToken , COOKIE_OPTIONS)
        .cookie("refreshToken" , refreshToken , COOKIE_OPTIONS)
        .json(new ApiResponse(200 , "RefreshToken refreshed" , {accessToken , refreshToken}))

    } catch (error) {
        return res
        .status(401)
        .json(new ApiError(401 , error?.message || "Invalid Refresh Token"))
    }    
    
})




export { registerUser, loginUser, logoutUser, getAllUser, refreshAccessToken };
