import express from "express";
import { fetchuser, isAdmin } from "../midleware/fetchuser.js";
import foridable from "express-formidable";
import {
  addProduct,
  DeleteProduct,
  fetchProductPhoto,
  fetchProductthubnailimage1,
  fetchProductthubnailimage2,
  fetchProductthubnailimage3,
  fetchProductthubnailimage4,
  fetchProductthubnailimage5,
  filterProductController,
  getProductController,
  getSingleProductController,
  PerPageController,
  Productcountontroller,
  searchProductController,
  UpdateProduct,
} from "../controller/PrdouctController.js";

const router = express.Router();

router.post("/Create-Product", fetchuser, isAdmin, foridable(), addProduct);

router.get("/get-Products", getProductController);

router.get("/get-SingleProduct/:slug", getSingleProductController);

router.get("/get-ProductPhoto/:pid", fetchProductPhoto);
router.get("/get-ProductPhotothubnail1/:pid", fetchProductthubnailimage1);
router.get("/get-ProductPhotothubnail2/:pid", fetchProductthubnailimage2);
router.get("/get-ProductPhotothubnail3/:pid", fetchProductthubnailimage3);
router.get("/get-ProductPhotothubnail4/:pid", fetchProductthubnailimage4);
router.get("/get-ProductPhotothubnail5/:pid", fetchProductthubnailimage5);
router.delete("/delete-Product/:pid", DeleteProduct);

router.put(
  "/Update-Product/:id",
  fetchuser,
  isAdmin,
  foridable(),
  UpdateProduct
);

router.post("/filter-Product", filterProductController);

router.get("/total", Productcountontroller);

router.get("/perpageProduct/:page", PerPageController);

router.get("/search/:query", searchProductController);

export default router;
