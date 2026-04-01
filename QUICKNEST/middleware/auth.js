import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js";
import User from "../model/UserModel.js";

const auth = async function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    // console.log("Authorization", authHeader);

    if (!authHeader) {
      return next(new HttpError("Auth Header is Required..!"));
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return next(new HttpError("Authorization Failed.....", 401));
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default auth;
