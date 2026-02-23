// Import mongoose (MongoDB library for Node.js)
import mongoose from "mongoose"

// Function to connect database
async function connectDB() {
    try {

        // Connect to local MongoDB database named "Linkedin"
        await mongoose.connect("mongodb://127.0.0.1:27017/Linkedin")

        console.log("DB connected")

    } catch (error) {

        // If connection fails → show error message
        console.log("MongoDB connection Failed:", error.message)

        // Stop application
        process.exit(1)
    }
}

// Export function so other files can use it
export default connectDB