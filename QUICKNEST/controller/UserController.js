import User from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const newUser = {
      name,
      email,
      password,
      phone,
      role,
    };

    const user = new User(newUser);

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User Add Successfully..!", user });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      next(new HttpError("Unable to Login..!"));
    }

    res
      .status(200)
      .json({ message: "Login SuccessFully....", success: true, user });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default { add, login };
