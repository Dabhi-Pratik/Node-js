import HttpError from "../middleware/HttpError.js";
import User from "../model/UserModel.js";

const updateUserData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return next(new HttpError("User Not Found......", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFiled = [
      "name",
      "email",
      "password",
      "phone",
      "role",
      "profilePic",
      "isValid",
    ];

    const isValid = updates.every((field) => allowedFiled.includes(field));

    if (!isValid) {
      return next(new HttpError("Only allowed Fields can be Updated...!", 404));
    }

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Data Updated Successfully...!",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.param.id;

    const user = await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "User Data Deleted Successfully..." });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default { updateUserData, deleteUser };
