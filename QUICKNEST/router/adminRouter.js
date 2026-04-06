import express from "express";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";
import adminController from "../controller/adminController.js";
import UserController from "../controller/UserController.js";
import uploads from "../middleware/upload.js";
import add from "../controller/categoryController.js";

const router = express.Router();

router.post("/add", add);

router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  UserController.allUser,
);

export default router;
