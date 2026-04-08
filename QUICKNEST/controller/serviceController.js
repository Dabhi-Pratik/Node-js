import Service from "../model/service.js";
import HttpError from "../middleware/HttpError.js";
import Category from "../model/category.js";

const addService = async (req, res, next) => {
  try {
    const { name, price, duration, isActive, description, category } = req.body;

    // ✅ Check duplicate
    const existingService = await Service.findOne({ name });
    if (existingService) {
      return next(new HttpError("Service already exists", 400));
    }

    // ✅ Check category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return next(new HttpError("Category not found", 404));
    }

    // ✅ Create service with category
    const newService = new Service({
      name,
      price,
      duration,
      isActive,
      description,
      category,
    });

    await newService.save();

    console.log("Service:", newService);

    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      newService,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default addService;
