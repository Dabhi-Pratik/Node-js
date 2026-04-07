import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(2).label("name").trim().required().messages({
    "string.base": "Category Name must be in String formate",
    "string.min": "Category Name must be at least 2 word",
    "string.empty": "Category name is required",
    "ant.required": "Category name must be Required",
  }),
  description: Joi.string().allow(""),
});

export const createCategorySchema = categorySchema
  .fork(["name", "description"], (field) => field.required())
  .messages({ "any.required": "{#label} is Required" });

export const updateCategorySchema = categorySchema
  .fork(["name", "description"], (fields) => fields.optional())
  .fork(["name", "description"], (fields) => fields.forbidden())
  .messages({
    "object.missing": "name and description fields are update",
  });

export default categorySchema;
