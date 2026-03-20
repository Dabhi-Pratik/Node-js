import express from "express"
import HttpError from "../middleware/HttpError.js"

const checkAuth = async (req,res,next)=>{
    if(!req.user){
        return next(new HttpError("Unable to Login"))
    }
    next()
}

const router = express.Router()

router.get("/profile",checkAuth,(req,res)=>{
    res.render("profile",{user:req.user})
})

export default router