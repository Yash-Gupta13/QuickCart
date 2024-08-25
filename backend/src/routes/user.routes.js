import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUser,
  refreshAccessToken,
  getCurrentUserProfile,
} from "../controllers/user.controller.js";
import {
  verifyJWT,
  authorizeAdmin,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(verifyJWT, authorizeAdmin, getAllUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route('/profile').get(verifyJWT , getCurrentUserProfile);

//?when user accesstoken is expired then user hit the link 

router.route('/refresh-token').post(refreshAccessToken)

export default router;
