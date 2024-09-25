import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
      return res
        .status(400)
        .json(new ApiError(400, "Category name can't be left blank"));
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(401).json(new ApiError(401, "Category Already Exist"));
    }

    const category = await Category.create({
      name,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Created Successfully", category));
  } catch (error) {
    return res.status(400).json(new ApiError(400, "error.message"));
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    if (!name.trim()) {
      return res
        .status(401)
        .json(new ApiError(401, "Category name can't be left blank"));
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name: name,
        },
      },
      {
        new: true,
      }
    );

    if (!category) {
      return res.status(401).json(new ApiError(401, "Category doesn't exist"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Updated Successfully", category));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(401).json(new ApiError(401, "Id doesn't exist"));
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(400).json(new ApiError(400, "Category doesn't exist"));
    }

    return res.status(200).json(new ApiResponse(200, "Deleted Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

const getAllCategory = asyncHandler(async(req, res)=>{
    const categories = await Category.find({})

    if(!categories){
        return res
        .status(401)
        .json(new ApiError(401, "Unable to get the Categories"));
    }
    

    return res
    .status(200)
    .json(new ApiResponse(200 , "Fetched Successfully" , categories));
})

export { createCategory, updateCategory, deleteCategory,getAllCategory };
