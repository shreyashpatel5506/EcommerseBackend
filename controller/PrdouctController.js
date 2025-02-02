import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import fs from "fs";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.fields;
    const {
      MainImage,
      thubnailimage1,
      thubnailimage2,
      thubnailimage3,
      thubnailimage4,
      thubnailimage5,
    } = req.files;
    if (!name || !description || !price || !category || !stock) {
      return res.status(500).send({
        error: "All fields are required",
      });
    }
    if (!MainImage) {
      return res.status(400).send({
        error: "Photo required",
      });
    }
    const newProduct = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (MainImage) {
      newProduct.MainImage.data = fs.readFileSync(MainImage.path);
      newProduct.contentType = MainImage.type;
      thubnailimage3;
    }
    if (thubnailimage1) {
      newProduct.thubnailimage1.data = fs.readFileSync(thubnailimage1.path);
      newProduct.contentType = thubnailimage1.type;
    }
    if (thubnailimage2) {
      newProduct.thubnailimage2.data = fs.readFileSync(thubnailimage2.path);
      newProduct.contentType = thubnailimage2.type;
    }
    if (thubnailimage3) {
      newProduct.thubnailimage3.data = fs.readFileSync(thubnailimage3.path);
      newProduct.contentType = thubnailimage3.type;
    }
    if (thubnailimage4) {
      newProduct.thubnailimage4.data = fs.readFileSync(thubnailimage4.path);
      newProduct.contentType = thubnailimage4.type;
    }
    if (thubnailimage5) {
      newProduct.thubnailimage5.data = fs.readFileSync(thubnailimage5.path);
      newProduct.contentType = thubnailimage5.type;
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

export const getProductController = async (req, res) => {
  try {
    const getProducts = await ProductModel.find({})
      .select("-MainImage")
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
    }).select("-MainImage");

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
      "MainImage"
    );
    if (ProductPhoto && ProductPhoto.MainImage && ProductPhoto.MainImage.data) {
      res.set("Content-type", ProductPhoto.MainImage.contentType);
      return res.status(200).send(ProductPhoto.MainImage.data);
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
export const fetchProductthubnailimage1 = async (req, res) => {
  try {
    const ProductPhoto = await ProductModel.findById(req.params.pid).select(
      "thubnailimage1"
    );
    if (
      ProductPhoto &&
      ProductPhoto.thubnailimage1 &&
      ProductPhoto.thubnailimage1.data
    ) {
      res.set("Content-type", ProductPhoto.thubnailimage1.contentType);
      return res.status(200).send(ProductPhoto.thubnailimage1.data);
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
export const fetchProductthubnailimage2 = async (req, res) => {
  try {
    const ProductPhoto = await ProductModel.findById(req.params.pid).select(
      "thubnailimage2"
    );
    if (
      ProductPhoto &&
      ProductPhoto.thubnailimage2 &&
      ProductPhoto.thubnailimage2.data
    ) {
      res.set("Content-type", ProductPhoto.thubnailimage2.contentType);
      return res.status(200).send(ProductPhoto.thubnailimage2.data);
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

export const fetchProductthubnailimage3 = async (req, res) => {
  try {
    const ProductPhoto = await ProductModel.findById(req.params.pid).select(
      "thubnailimage3"
    );
    if (
      ProductPhoto &&
      ProductPhoto.thubnailimage3 &&
      ProductPhoto.thubnailimage3.data
    ) {
      res.set("Content-type", ProductPhoto.thubnailimage3.contentType);
      return res.status(200).send(ProductPhoto.thubnailimage3.data);
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

export const fetchProductthubnailimage4 = async (req, res) => {
  try {
    const ProductPhoto = await ProductModel.findById(req.params.pid).select(
      "thubnailimage4"
    );
    if (
      ProductPhoto &&
      ProductPhoto.thubnailimage4 &&
      ProductPhoto.thubnailimage4.data
    ) {
      res.set("Content-type", ProductPhoto.thubnailimage4.contentType);
      return res.status(200).send(ProductPhoto.thubnailimage4.data);
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

export const fetchProductthubnailimage5 = async (req, res) => {
  try {
    const ProductPhoto = await ProductModel.findById(req.params.pid).select(
      "thubnailimage5"
    );
    if (
      ProductPhoto &&
      ProductPhoto.thubnailimage5 &&
      ProductPhoto.thubnailimage5.data
    ) {
      res.set("Content-type", ProductPhoto.thubnailimage5.contentType);
      return res.status(200).send(ProductPhoto.thubnailimage5.data);
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
    const {
      MainImage,
      thubnailimage1,
      thubnailimage2,
      thubnailimage3,
      thubnailimage4,
      thubnailimage5,
    } = req.files;
    if (!name || !description || !price || !category || !stock) {
      return res.status(500).send({
        error: "All feilds are required",
      });
    }
    if (MainImage) {
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
    if (MainImage) {
      newProduct.MainImage.data = fs.readFileSync(MainImage.path);
      newProduct.contentType = MainImage.type;
    }
    if (thubnailimage1) {
      newProduct.thubnailimage1.data = fs.readFileSync(thubnailimage1.path);
      newProduct.contentType = thubnailimage1.type;
    }
    if (thubnailimage2) {
      newProduct.thubnailimage2.data = fs.readFileSync(thubnailimage2.path);
      newProduct.contentType = thubnailimage2.type;
    }
    if (thubnailimage3) {
      newProduct.thubnailimage3.data = fs.readFileSync(thubnailimage3.path);
      newProduct.contentType = thubnailimage3.type;
    }
    if (thubnailimage4) {
      newProduct.thubnailimage4.data = fs.readFileSync(thubnailimage4.path);
      newProduct.contentType = thubnailimage4.type;
    }
    if (thubnailimage5) {
      newProduct.thubnailimage5.data = fs.readFileSync(thubnailimage5.path);
      newProduct.contentType = thubnailimage5.type;
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

export const filterProductController = async (req, res) => {
  try {
    const { selectedCategories = [], price = [] } = req.body;
    let args = {};
    if (selectedCategories.length > 0) {
      args.category = { $in: selectedCategories };
    }
    if (price.length > 0) {
      args.price = { $gte: price[0], $lte: price[1] };
    }

    const filterProduct = await ProductModel.find(args);

    return res.status(200).send({
      success: true,
      message: "Filtered Products",
      getProducts: filterProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error during getting products",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Query parameter is required",
      });
    }
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).select("-MainImage");
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during searching products",
      error,
    });
  }
};

export const Productcountontroller = async (req, res) => {
  try {
    const count = await ProductModel.find({}).countDocuments();
    res.status(200).send({
      success: true,
      message: "Total Products",
      count,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error during getting a product",
      error,
    });
  }
};

export const PerPageController = async (req, res) => {
  try {
    const Productperpage = 1;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find()
      .limit(Productperpage)
      .select("-MainImage")
      .skip((page - 1) * Productperpage)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Products per page",
      products,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error during getting products",
      error,
    });
  }
};

export const relatedProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    console.log("pid:", pid, "cid:", cid);
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-MainImage")
      .limit(6)
      .sort({ createdAt: -1 })
      .populate("category");

    return res.status(200).send({
      success: true,
      message: "Related products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("error::" + error);
    return res.status(500).send({
      success: false,
      message: "Error during fetching related products",
      error,
    });
  }
};

export const getProductsByCategoryId = async (req, res) => {
  try {
    const { id } = req.params; // Ensure this matches the route param

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const products = await ProductModel.find({ category: id })
      .select("-MainImage")
      .populate("category");

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found for this category",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching products by category",
      error: error.message,
    });
  }
};
