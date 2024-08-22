import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js';
import {asyncHandler} from '../utils/asyncHandler.util.js';
import { COOKIE_OPTIONS } from '../utils/constant.js';


const generateAcessAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;

        //? this is for it doest not throw error where where we put the reuqired on the field 

        await user.save({validateBeforeSave : false});

        return {accessToken , refreshToken};
        
    } catch (error) {
        return res.
        status(500)
        .json(new ApiError(500 , "Something went wrong while generating access and refresh token"));
    }
}

const registerUser = asyncHandler(async(req, res)=>{

    const {username , email , password} = req.body;

    if(!username?.trim() || !email?.trim() || !password?.trim()){
        return res
        .status(400)
        .json(new ApiError(400 , "Please provide all required fields."));
    }

    const userExist = await User.findOne({email});

    if(userExist){
        return res
        .status(409)
        .json(new ApiError(409 , "User already exists , Please Sign in."));
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const {accessToken , refreshToken} = await generateAcessAndRefreshToken(user._id);

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        return res
        .status(500)
        .json(new ApiError(500 , "Something went wrong while registering user"));
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken , COOKIE_OPTIONS)
    .cookie("refreshToken" , refreshToken , COOKIE_OPTIONS)
    .json(new ApiResponse(200 , "User Register Successfully" , createdUser));

})

const loginUser = asyncHandler(async(req, res)=>{
    const {email , password} = req.body;

    if(!email?.trim() || !password?.trim()){
        res
        .status(400)
        .json(new ApiError(400 , "Please provides all required fields "));
    }

    const existingUser = await User.findOne({email});

    if(!existingUser){
        res
        .status(401)
        .json(new ApiError(401 , "Invalid Email/Passowrd "));
    }

    const validPassword = await existingUser.isPasswordCorrect(password);

    if(!validPassword){
        res
        .status(401)
        .json(new ApiError(401, "Invalid Email/Password"));
    }

    const {accessToken , refreshToken} = await generateAcessAndRefreshToken(existingUser._id);

    const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken"); 

    return res
    .status(200)
    .cookie("accessToken" , accessToken , COOKIE_OPTIONS)
    .cookie("refreshToken" , refreshToken , COOKIE_OPTIONS)
    .json(new ApiResponse(200 , "User LoggedIn Successfully" , loggedInUser))

})


export {registerUser , loginUser};