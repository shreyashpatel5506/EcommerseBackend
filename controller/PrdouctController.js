import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import fs from "fs";
import Product from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.fields;
    const { imageUrl } = req.files;
    if (!name || !description || !price || !category || !stock) {
      return res.status(500).send({
        error: "All fields are required",
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
      message: "Product updated successfully",
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

export const getProductController = async (req, res) => {
  try {
    const getProducts = await ProductModel.find({})
      .select("-imageUrl")
      .limit(12)

      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      countTotal: getProducts.length,
      message: "All Products",
      getProducts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error during getting a product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    }).select("-imageUrl");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error during getting a product",
      error,
    });
  }
};

export const fetchProductPhoto = async (req, res) => {
  try {
    const ProductPhoto = await ProductModel.findById(req.params.pid).select(
      "imageUrl"
    );
    if (ProductPhoto.imageUrl.data) {
      res.set("Content-type", ProductPhoto.imageUrl.contentType);
      return res.status(200).send(ProductPhoto.imageUrl.data);
    }
  } catch (error) {
    console.log("error::" + error);
    return res.status(500).send({
      success: false,
      message: "Error during getting a product image",
      error,
    });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const Product = await ProductModel.findOneAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      Product,
    });
  } catch (error) {
    console.log("error::" + error);
    return res.status(500).send({
      success: false,
      message: "Error during getting a product image",
      error,
    });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.fields;
    const { imageUrl } = req.files;
    if (!name || !description || !price || !category || !stock) {
      return res.status(500).send({
        error: "All feilds are required",
      });
    }
    if (imageUrl && imageUrl.size > 1000000) {
      return res.status(500).send({
        error: "Photo must be less than 1 mb",
      });
    }
    const newProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
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
