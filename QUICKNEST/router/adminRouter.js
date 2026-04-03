import express from "express";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";
import adminController from "../controller/adminController.js";
import UserController from "../controller/UserController.js";
import uploads from "../middleware/upload.js";

const router = express.Router();

router.patch(
  "/update/:id",
  auth,
  uploads.single("profilePic"),
  checkRole("admin", "super_admin"),
  adminController.updateUserData,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  adminController.deleteUser,
);

router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  UserController.allUser,
);

export default router;
