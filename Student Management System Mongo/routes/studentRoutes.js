import express from "express";
import studentController from "../controler/studentController.js";

const router = express.Router();

router.post("/add", studentController.add);
router.get("/all", studentController.allStudent);
router.get("/:id", studentController.studentById);
router.delete("/:id", studentController.deleteStudent);
router.put("/update/:id", studentController.updateStudent);

export default router;