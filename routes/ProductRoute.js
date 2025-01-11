import express from "express";
import { fetchuser, isAdmin } from "../midleware/fetchuser.js";
import foridable from "express-formidable";
import {
  addProduct,
  DeleteProduct,
  fetchProductPhoto,
  getProductController,
  getSingleProductController,
  UpdateProduct,
} from "../controller/PrdouctController.js";

const router = express.Router();

router.post("/Create-Product", fetchuser, isAdmin, foridable(), addProduct);

router.get("/get-Products", getProductController);

router.get("/get-SingleProduct/:slug", getSingleProductController);

router.get("/get-ProductPhoto/:pid", fetchProductPhoto);

router.delete("/delete-Product/:pid", DeleteProduct);

router.post(
  "/Update-Product/:pid",
  fetchuser,
  isAdmin,
  foridable(),
  UpdateProduct
);

export default router;
