import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    MainImage: {
      contentType: String,
      data: Buffer,
    },
    thubnailimage1: {
      contentType: String,
      data: Buffer,
    },
    thubnailimage2: {
      contentType: String,
      data: Buffer,
    },
    thubnailimage3: {
      contentType: String,
      data: Buffer,
    },
    thubnailimage4: {
      contentType: String,
      data: Buffer,
    },
    thubnailimage5: {
      contentType: String,
      data: Buffer,
    },
    shipping: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
