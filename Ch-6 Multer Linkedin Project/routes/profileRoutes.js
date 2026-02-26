import express from "express"

import uploads from "../middleware/upload.js"
import ProfileController from "../controller/ProfileController.js"

const router = express.Router()

router.post("/add",uploads.fields([
    {
        name:"profileImage",
        maxCount:1,
    },
    {
        name:"resume",
        maxCount:1,
    },
    {
        name:"projectImages",
        maxCount:3,
    },
    {
        name:"introVideo",
        maxCount:1,
    },
]),
 ProfileController.createProfile,
)
router.get("/all",ProfileController.getAllProfiles)
router.get("/:id",ProfileController.getSingleProfile)
router.delete("/:id",ProfileController.deleteProfile)


export default router