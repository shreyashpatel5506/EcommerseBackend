import slugify from "slugify";
import CreateCategoryModel from "../models/CreateCategoryModel.js";

export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate name
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }

    // Check if category already exists
    const existingCategory = await CreateCategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    // Create a new category
    const category = await new CreateCategoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.error("Error in Category Creation:", error.message);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Category",
    });
  }
};

export const CategoryUpdateController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Validate input
    if (!id || !name) {
      return res.status(400).send({ message: "ID and new name are required" });
    }

    // Find the category by ID
    const category = await CreateCategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    console.log(category);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    // // Update the category name and slug
    // category.name = name;
    // category.slug = slugify(name);
    // await category.save();

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Error in Category Update:", error.message);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Category Update",
    });
  }
};

export const CategoryGets = async (req, res) => {
  try {
    const category = await CreateCategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Category List",
      category,
    });
  } catch (error) {
    console.error("Error in Category get:", error.message);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Category Update",
    });
  }
};

export const SingleCategoryGets = async (req, res) => {
  try {
    const category = await CreateCategoryModel.findOne({
      slug: req.params.slug,
    });
    console.log(category);
    res.status(200).send({
      success: true,
      message: "All Category List",
      category,
    });
  } catch (error) {
    console.error("Error in Category get:", error.message);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Category Update",
    });
  }
};

export const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CreateCategoryModel.findOneAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Delete  Category successfully",
      category,
    });
  } catch (error) {
    console.error("Error in Category get:", error.message);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Category Update",
    });
  }
};
