import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUser,
  refreshAccessToken,
  getCurrentUserProfile,
  changeOldPassword,
  updateUserProfileInfo,
} from "../controllers/user.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();


//* unprotected route

router.route("/").post(registerUser);
router.route("/login").post(loginUser);

//* protected routes

router.route('/get-all-user').get(verifyJWT, authorizeAdmin, getAllUser)
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getCurrentUserProfile)
router.route('/profile/change-password').post(verifyJWT, changeOldPassword)
router.route('/profile/update-profile').patch(verifyJWT, updateUserProfileInfo);

//?when user accesstoken is expired then user hit the link
router.route("/refresh-token").post(refreshAccessToken);


export default router;
