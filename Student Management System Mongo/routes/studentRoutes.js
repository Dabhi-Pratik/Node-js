import express from "express"
import add from "../controler/studentController.js"

const router = express.Router()

router.post("/add",add)

export default router