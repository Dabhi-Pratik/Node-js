import express from "express";
import UserController from "../controller/UserController.js";

const router = express.Router();

router.post("/add", UserController.add);
router.get("/login", UserController.login);

export default router;
