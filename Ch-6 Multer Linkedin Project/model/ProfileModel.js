// Import mongoose
import mongoose from "mongoose";

// Create schema (structure of data in database)
const ProfileSchema = new mongoose.Schema({

    // firstName field
    fullName: {
        type: String,   // Data type is String
        required: true, // This field is mandatory
        trim: true      // Remove extra spaces before/after text
    },
    bio:String,
    headline:String,
    profileImage:String,
    resume:String,
    projectImages:[String],
    introVideo:String,
})

const Profile = mongoose.model("Profile",ProfileSchema)

export default Profile

// (Optional) Export model to use in routes
// export default mongoose.model("Profile", Profile);