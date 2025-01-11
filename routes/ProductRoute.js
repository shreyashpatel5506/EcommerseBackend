import express from "express";
import { fetchuser, isAdmin } from "../midleware/fetchuser.js";
import foridable from "express-formidable";
import { addProduct } from "../controller/PrdouctController.js";

const router = express.Router();

router.post("/Create-Product", fetchuser, isAdmin, foridable(), addProduct);

export default router;
