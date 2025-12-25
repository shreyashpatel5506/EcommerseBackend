import express from "express";
import {
  CategoryGets,
  CategoryUpdateController,
  CreateCategoryController,
  DeleteCategory,
  SingleCategoryGets,
} from "../controller/CreateCategoryController.js";
import { fetchuser, isAdmin } from "../middleware/fetchuser.js";

const router = express.Router();

// Create Category Route
router.post("/create-category", fetchuser, isAdmin, CreateCategoryController);
router.put(
  "/update-category/:id",
  fetchuser,
  isAdmin,
  CategoryUpdateController
);

router.get("/get-category", CategoryGets);

router.get("/single-category/:slug", SingleCategoryGets);

router.delete("/delete-category/:id", fetchuser, isAdmin, DeleteCategory);
export default router;
