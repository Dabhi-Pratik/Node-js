import HttpError from "./HttpError.js";

const checkAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/auth/login");
    }
    next();
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default checkAuth;
