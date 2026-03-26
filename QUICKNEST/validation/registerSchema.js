import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name Must be in String Formate",
    "string.empty": "Name is Required",
    "string.min": "Name must be at least 2 Character",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email Must be in String Formate",
    "string.empty": "Email is Required",
    "string.email": "Email Format is Invalid",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      "string.base": "Password Must be in String Formate",
      "string.empty": "Password is Required",
      "string.pattern.base":
        "Password must be 3-30 characters (letters & numbers only)",
      "any.required": "Password is required",
    }),
  phone: Joi.number().required().min(1000000000).max(9999999999).messages({
    "number.base": "Phone must be a number",
    "number.min": "Phone number must be 10 digits",
    "number.max": "Phone number must be 10 digits",
    "any.required": "Phone number is required",
  }),
  role: Joi.string().optional().messages({
    "string.base": "Role must be a string",
  }),
});

export default registerSchema;
