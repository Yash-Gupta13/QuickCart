import { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/category.controller.js";
import { authorizeAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, authorizeAdmin, createCategory);
router
  .route("/update-category/:categoryId")
  .patch(verifyJWT, authorizeAdmin, updateCategory);
router
  .route("/delete-category/:categoryId")
  .delete(verifyJWT, authorizeAdmin, deleteCategory);
router.route('/getAllCategories').get(getAllCategory);

export default router;
