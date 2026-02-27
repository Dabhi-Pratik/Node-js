import mongoose, { connect } from "mongoose"

async function connectDB(){
    try {
        await mongoose.connect("")

        console.log("DB connected....")
    } catch (error) {
        console.log("mongoDB connection Failed: ",error.message)
        process.exit(1)
    }
}

export default connectDB;