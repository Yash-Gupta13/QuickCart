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
  deleteUserById,
  updateUserById,
} from "../controllers/user.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();


//* unprotected route

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//* protected routes

router.route('/get-all-user').get(verifyJWT, authorizeAdmin, getAllUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getCurrentUserProfile);
router.route('/profile/change-password').post(verifyJWT, changeOldPassword);
router.route('/profile/update-profile').patch(verifyJWT, updateUserProfileInfo);

//?when user accesstoken is expired then user hit the link
router.route("/refresh-token").post(refreshAccessToken);


//!admin routes

router.route('/admin/:id').delete(verifyJWT,authorizeAdmin,deleteUserById);
router.route('/admin/update-user-info/:id').patch(verifyJWT,authorizeAdmin,updateUserById);


export default router;
