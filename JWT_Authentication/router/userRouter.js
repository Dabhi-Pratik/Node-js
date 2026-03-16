import express from "express"
import userController from "../controller/userController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/add",userController.add)
router.post("/login",userController.login)
router.get("/allUser",userController.getAllUser)

router.get("/authLogin",auth,userController.authLogin)

export default router