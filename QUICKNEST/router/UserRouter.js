import express from "express";
import UserController from "../controller/UserController.js";
import validate from "../middleware/validate.js";
import registerSchema from "../validation/registerSchema.js";

const router = express.Router();

router.post("/add", validate(registerSchema), UserController.add);
router.get("/login", UserController.login);

export default router;
