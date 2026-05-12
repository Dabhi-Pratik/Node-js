import User from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

import sendMail from "../utils/sendEmail.js";
import {
  generateEmailTemplate,
  generateResetPasswordTemplate,
} from "../services/emailTemplet.js";

import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

import auditLogger from "../utils/auditLog.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const newUser = {
      name,
      email,
      password,
      phone,
      role,
      profilePic: req.file ? req.file.path : "undefine",
      cloudinary_id: req.file ? req.file.filename : "undefined",
    };

    const user = new User(newUser);

    sendMail({
      to: user.email,
      subject: "Welcome to QUICKNEST",
      html: generateEmailTemplate({ userName: user.name }),
    });

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User Add Successfully..!",
      user,
      token,
    });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      return next(new HttpError("Unable to Login..!"));
    }

    const token = await user.generateAuthToken();

    res
      .status(200)
      .json({ message: "Login SuccessFully....", success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const authLogin = async function (req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("Unable to Login", 401));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const logOut = async (req, res, next) => {
  try {
    const user = req.user;

    // Remove current token
    user.tokens = user.tokens.filter((t) => {
      return t.token !== req.token;
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Log-Out Successfully!",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "User Log-out from all device..!" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const allUser = async (req, res, next) => {
  try {
    const { role, limit, skip, sortBy } = req.query;

    let sortByValue = {};
    let query = {};

    // ✅ filter
    if (role) {
      query.role = role;
    }

    // ✅ FIXED CONDITION
    if (sortBy) {
      const [field, order] = sortBy.split(":");
      sortByValue[field] = order === "desc" ? -1 : 1;
    } else {
      sortByValue = { createdAt: -1 }; // optional default
    }

    const users = await User.find(query)
      .limit(parseInt(limit) || 5)
      .skip(parseInt(skip) || 0)
      .sort(sortByValue);

    if (!users.length) {
      return next(new HttpError("No User Data Found....!", 404));
    }

    res.status(200).json({
      success: true,
      message: "All users are",
      length: users.length,
      users,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const update = async (req, res, next) => {
  try {
    let targetedUser = req.params.id || req.user._id.toString();

    const user = await User.findById(targetedUser);

    if (!user) {
      return next(new HttpError("user not Found..", 404));
    }

    const updates = Object.keys(req.body);

    let allowedFiled = ["name", "password", "phone"];

    if (req.user.role === "admin" || req.user.role === "super_admin") {
      allowedFiled = [...allowedFiled, "role", "isValid"];
    }

    if (
      targetedUser !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      req.user.role !== "super_admin"
    ) {
      return next(new HttpError("Unauthorized Access", 401));
    }

    const isValid = updates.every((fields) => allowedFiled.includes(fields));

    if (!isValid) {
      return next(new HttpError("Only Allowed fields can be Updated", 404));
    }

    updates.forEach((update) => (user[update] = req.body[update]));

    if (req.file) {
      if (user.cloudinary_id) {
        await cloudinary.uploader.destroy(user.cloudinary_id);
      }

      user.profilePic = req.file.path;
      user.cloudinary_id = req.file.filename;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User data updated Successfully..!",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    let targetedUser = req.params.id || req.user._id.toString();

    const user = await User.findById(targetedUser);

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    if (
      targetedUser !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      req.user.role !== "super_admin"
    ) {
      return next(new HttpError("Unauthorized Access", 401));
    }

    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    await User.findByIdAndDelete(targetedUser);

    await auditLogger({
      action: "USER_DELETE",
      performedBy: req.user._id,
      module: user.role,
      targetedId: user._id,
      Id: req.ip,
      userAgent: req.get("User_Agent"),
    });

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully...",
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new HttpError("User Not Found...!", 404));
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExPiry =  Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `localhost:5000/user/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: generateResetPasswordTemplate(user.name, resetLink),
    });
    res.status(200).json({
      success: true,
      message: "Password Resent Link Sent SuccessFully...!",
      resetLink,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;

    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return next(new HttpError("Password is not Matched", 404));
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExPiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new HttpError("Password or Token is expired please try again...!"),
      );
    }

    user.password = confirmPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExPiry = null;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully....!" });
  } catch (error) {}
};

export default {
  add,
  login,
  authLogin,
  logOut,
  logOutAll,
  allUser,
  update,
  deleteUser,
  forgotPassword,
  resetPassword,
};
