import express from "express";
import passport from "passport";
import User from "../Model/userModel.js";
import HttpError from "../middleware/HttpError.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.render("profile", { user: req.user });
  },
);

router.get("/logOut", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(new HttpError("Fail to logout"));
    }
    res.redirect("/");
  });
});
export default router;
