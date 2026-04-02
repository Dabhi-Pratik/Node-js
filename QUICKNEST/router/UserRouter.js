import express from "express";
import UserController from "../controller/UserController.js";
import validate from "../middleware/validate.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/UserSchema.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import uploads from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/add",
  validate(createUserSchema),
  uploads.single("profilePic"),
  UserController.add,
);
router.get("/login", UserController.login);
router.get("/authLogin", auth, UserController.authLogin);
router.post("/logOut", auth, UserController.logOut);
router.post("/logOutAll", auth, UserController.logOutAll);
router.post(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  UserController.allUser,
);

router.patch(
  "/update",
  auth,
  validate(updateUserSchema),
  UserController.update,
);

router.delete("/delete", auth, UserController.deleteUser);

export default router;
