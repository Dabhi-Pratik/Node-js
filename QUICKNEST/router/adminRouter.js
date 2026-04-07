import express from "express";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";

import validate from "../middleware/validate.js"

import UserController from "../controller/UserController.js";
import uploads from "../middleware/upload.js";
import categoryController from "../controller/categoryController.js";

import addService from "../controller/serviceController.js";
import categorySchema from "../validation/categorySchema.js";

const router = express.Router();

router.post(
  "update/:id",
  auth,
  validate(categorySchema),
  checkRole("admin", "super_admin"),
  UserController.update,
);

router.delete(
  "delete/:id",
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
  "/add",
  auth,
  checkRole("admin", "supper_admin"),
  categoryController.add,
);

router.patch(
  "/update",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.update,
);

router.delete(
  "/update",
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
export default router;
