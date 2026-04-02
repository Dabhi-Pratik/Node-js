import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().label("name").min(2).messages({
    "string.base": "Name Must be in String Formate",
    "string.empty": "Name is Required",
    "string.min": "Name must be at least 2 Character",
  }),
  email: Joi.string().label("email").email().messages({
    "string.base": "Email Must be in String Formate",
    "string.empty": "Email is Required",
    "string.email": "Email Format is Invalid",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .label("password")
    .messages({
      "string.base": "Password Must be in String Formate",
      "string.empty": "Password is Required",
      "string.pattern.base":
        "Password must be 3-30 characters (letters & numbers only)",
    }),
  profilePic: Joi.string().label("profilePic").messages({
    "string.base": "profile in string Formate",
  }),
  phone: Joi.number().label("phone").min(1000000000).max(9999999999).messages({
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
  (fields) => fields.required(),
).messages({ "any.required": "{#label} is Required" });

export const updateUserSchema = UserSchema.fork(
  ["name", "password", "phone", "profilePic"],
  (fields) => fields.optional(),
)
  .fork(["name", "password", "phone", "profilePic"], (fields) =>
    fields.forbidden(),
  )
  .messages({
    "object.missing": "name and password and phone fields are update",
  });

export default UserSchema;
