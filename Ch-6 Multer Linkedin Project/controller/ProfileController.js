import HttpError from "../middleware/HttpError.js"
import Profile from "../model/ProfileModel.js"
import fs from "fs"

const createProfile = async (req, res, next) => {
    try {
        const { fullName, bio, headline } = req.body

        if (!fullName) {
            return next(new HttpError("Full name is required", 400))
        }

        const files = req.files || {}

        const profileImage = files.profileImage?.[0]
        const resume = files.resume?.[0]
        const introVideo = files.introVideo?.[0]
        const projectImages = files.projectImages || []

        const newProfile = new Profile({
            fullName,
            bio,
            headline,
            profileImage: profileImage?.path || null,
            resume: resume?.path || null,
            introVideo: introVideo?.path || null,
            projectImages: projectImages.map(file => file.path)
        })

        await newProfile.save()

        res.status(201).json({
            success: true,
            newProfile
        })

    } catch (err) {
        next(new HttpError(err.message, 500))
    }
}

const getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find()

        res.status(200).json({ success: true, data: profiles })
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const getSingleProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findById(req.params.id)

        if (!profile) {
            res.status(404).json({ success: false, message: "Profile Not found..!" })
        }
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

//Delete

const deleteProfile = async (req, res, next) => {
    try {
        const { id } = req.params

        const profile = await Profile.findById(id)

        if (!profile) {
            return next(new HttpError("Profile Not Found...!", 500))
        }

        // Delete files from uploads folder

        const filesDelete = [
            profile.profileImage,
            profile.resume,
            profile.introVideo,
            ...(profile.projectImages || [])
        ]

        filesDelete.forEach(filePath => {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        })

        await Profile.findByIdAndDelete(id)

        res.status(200).json({ success: true, message: "Profile Deleted SuccessFully..!" })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

export default { createProfile, getAllProfiles, getSingleProfile , deleteProfile}