import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().min(2).messages({
    "string.base": "Name Must be in String Formate",
    "string.empty": "Name is Required",
    "string.min": "Name must be at least 2 Character",
  }),
  email: Joi.string().email().messages({
    "string.base": "Email Must be in String Formate",
    "string.empty": "Email is Required",
    "string.email": "Email Format is Invalid",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      "string.base": "Password Must be in String Formate",
      "string.empty": "Password is Required",
      "string.pattern.base":
        "Password must be 3-30 characters (letters & numbers only)",
    }),
  phone: Joi.number().min(1000000000).max(9999999999).messages({
    "number.base": "Phone must be a number",
    "number.min": "Phone number must be 10 digits",
    "number.max": "Phone number must be 10 digits",
  }),
  role: Joi.string().optional().messages({
    "string.base": "Role must be a string",
  }),
});

export const createUserSchema = UserSchema.fork(
  ["name", "email", "password", "phone"],
  (field) =>
    field.required().messages({ "any.required": "{#label} is Required" }),
);

export const updateUserSchema = UserSchema.fork(
  ["name", "password", "phone"],
  (field) =>
    field
      .required()
      .or("name", "password", "phone")
      .messages({
        "object.missing":
          "At least one field (name , password,phone) is required for Update",
      }),
);

export default UserSchema;
