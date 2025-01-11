import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import fs from "fs";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.fields;
    const { imageUrl } = req.files;
    if (!name || !description || !price || !category || !stock) {
      return res.status(500).send({
        error: "All feilds are required",
      });
    }
    if (!imageUrl || imageUrl.size > 1000000) {
      return res.status(500).send({
        error: "Photo must be less than 10 mb",
      });
    }
    const newProduct = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (imageUrl) {
      newProduct.imageUrl.data = fs.readFileSync(imageUrl.path);
      newProduct.contentType = imageUrl.type;
    }
    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
    console.log(newProduct);
  } catch (error) {
    console.log("Error :-" + error);
    res.status(500).send({
      success: false,
      message: "Error during creating a product",
      error,
    });
  }
};
