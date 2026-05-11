import express from "express";
import UserController from "../controller/UserController.js";
import validate from "../middleware/validate.js";
import UserSchema from "../validation/UserSchema.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { uploadProfile } from "../middleware/upload.js";

import { authLimit } from "../middleware/rateLimit.js";

const router = express.Router();

router.post(
  "/add",
  validate(UserSchema),
  uploadProfile.single("profilePic"),
  UserController.add,
);
router.get("/login", authLimit, UserController.login);
router.get("/authLogin", auth, authLimit, UserController.authLogin);
router.post("/logOut", auth, authLimit, UserController.logOut);
router.post("/logOutAll", auth, UserController.logOutAll);

router.patch(
  "/update",
  auth,
  uploadProfile.single("profilePic"),
  UserController.update,
);

router.delete("/delete", auth, UserController.deleteUser);

router.post("/forgot-password", UserController.forgotPassword);

export default router;
