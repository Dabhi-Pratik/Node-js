import express from "express";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";

import validate from "../middleware/validate.js";

import UserController from "../controller/UserController.js";
import categoryController from "../controller/categoryController.js";

import addService from "../controller/serviceController.js";
import categorySchema from "../validation/categorySchema.js";

import adminController from "../controller/adminController.js";

const router = express.Router();

router.patch(
  "/update/:id",
  auth,
  validate(categorySchema),
  checkRole("admin", "super_admin"),
  UserController.update,
);

router.delete(
  "/delete/:id",
  auth,
  validate(categorySchema),
  checkRole("admin", "super_admin"),
  UserController.deleteUser,
);

router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  UserController.allUser,
);

//category

router.post(
  "/addCategory",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.addCategory,
);

router.patch(
  "/update",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.update,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.deleteCategory,
);

//Services

router.post(
  "/addServices",
  auth,
  checkRole("admin", "super_admin"),
  addService,
);

router.get(
  "/dashboardStatics",
  auth,
  checkRole("admin", "super_admin"),
  adminController.dashBoardStatics,
);

export default router;
