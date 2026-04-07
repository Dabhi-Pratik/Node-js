import Category from "../model/category.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category.create({
      name,
      description,
    });

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return next(new HttpError("Category already Existing", 500));
    }

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

const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ success: true, message: "All Categories" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      return next(new HttpError("Category Not Found", 404));
    }

    const update = Object.keys(req.body);

    const allowUpdate = ["name", "description"];

    const isValidUpdate = update.every((field) => {
      allowUpdate.includes(field);
    });

    if (!isValidUpdate) {
      return next(new HttpError("It is not valid Update Field", 400));
    }

    update.forEach((field) => {
      category[field] = req.body[field];
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully..",
      category,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return next(new HttpError("Category not Founded....", 400));
    }

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
      category,
    });

    await category.deleteOne();
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default { add, update, deleteCategory, getCategory };
