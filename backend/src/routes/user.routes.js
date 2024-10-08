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
  checkAuth,
} from "../controllers/user.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();


//* unprotected route

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//* protected routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getCurrentUserProfile);
router.route('/profile/change-password').post(verifyJWT, changeOldPassword);
router.route('/profile/update-profile').patch(verifyJWT, updateUserProfileInfo);

//?when user accesstoken is expired then user hit the link
router.route("/refresh-token").post(refreshAccessToken);
router.route("/checkAuth").post(checkAuth);


//!admin routes

router.route('/delete-user/:id').delete(verifyJWT,authorizeAdmin,deleteUserById);
router.route('/update-user-info/:id').patch(verifyJWT,authorizeAdmin,updateUserById);
router.route("/get-all-user").get(verifyJWT, authorizeAdmin, getAllUser);


export default router;
