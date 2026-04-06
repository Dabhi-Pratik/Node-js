import Category from "../model/category.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category.create({
      name,
      description,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category Added successfully...",
      newCategory,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default add
