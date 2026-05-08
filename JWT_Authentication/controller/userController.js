import User from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = {
      name,
      email,
      password,
    };

    const user = new User(newUser);

    const token = await user.generateAuthToken();

    await user.save();

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      next(new HttpError("Unable to login"));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users.length === 0) {
      return next(new HttpError("No data Found", 404));
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("Unable to Login", 401));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    await req.user.save();

    res.status(200).json({ message: "User Log out SuccessFully...!" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    req.user.save();

    res
      .status(200)
      .json({ message: "User LogOut from all devices SuccessFully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("User Not Found...", 404));
    }

    const updates = Object.keys(req.body);

    const allowUpdates = ["name", "password"];

    const isValidUpdate = updates.every((fields) => {
      return allowUpdates.includes(fields);
    });

    if (!isValidUpdate) {
      return next(new HttpError("Only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      return (user[update] = req.body[update]);
    });

    await user.save();

    res.status(200).json({ message: "User data updated successfully", user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.user._id;

    console.log("id", id);

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User Deleted SuccessFully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  login,
  getAllUser,
  authLogin,
  logOut,
  logOutAll,
  update,
  deleteUser,
};
