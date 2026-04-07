import Service from "../model/service.js";
import HttpError from "../middleware/HttpError.js";
import Category from "../model/category.js";

const addService = async (req, res, next) => {
  try {
    const { name, price, duration, isActive, description } = req.body;

    const existingService = await Service.findOne({ name });

    if (!existingService) {
      return next(new HttpError(error.message));
    }

    const existingCategory = await Category.findById(Category);

    if (!existingCategory) {
      return next(new HttpError("Category not Existed...", 500));
    }

    const newService = new Service({
      name,
      price,
      duration,
      isActive,
      description,
    });

    await newService.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Service Created Successfully....",
        newService,
      });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default addService
