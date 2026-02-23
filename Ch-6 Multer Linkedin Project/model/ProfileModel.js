// Import mongoose
import mongoose from "mongoose";

// Create schema (structure of data in database)
const Profile = new mongoose.Schema({

    // firstName field
    firstName: {
        type: String,   // Data type is String
        required: true, // This field is mandatory
        trim: true      // Remove extra spaces before/after text
    }

})

// (Optional) Export model to use in routes
// export default mongoose.model("Profile", Profile);