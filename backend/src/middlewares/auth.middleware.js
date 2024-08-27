import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/ApiError.util.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  //*------ Algo --------*//
  //? Take the accestoken from request
  //? then decode  that token
  //? after decoding it check it is valid or not
  //? if it is valid then we will make the use and send in the response

  try {
    const accessToken = req.cookies?.accessToken;
    //console.log(req.cookies);
    //console.log(`Access Token from verification of JWT `, accessToken);
    //console.log(`Refresh Token from verification of JWT `, refreshToken);

    if (!accessToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Session Expired, Please Login "));
    }

    const decodedToken = await jwt.verify(
      accessToken,
      process.env.ACCESSTOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(404)
        .json(
          new ApiError(404, "Account not found, Please verify credentials")
        );
    }

    req.user = user;
    //console.log(req.user);

    next();
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, error?.message || "Unauthorized Access"));
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json(new ApiError(401, "Not authroize as admin "));
  }
});

export { verifyJWT, authorizeAdmin };
