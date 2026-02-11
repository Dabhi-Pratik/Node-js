import mongoose from "mongoose"

async function connectDB(){
    try{
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/student")
        console.log("MongoDB Connected Successfully")

    }catch(error){
      console.error("MongoDB connection failed:", error.message)
        process.exit(1) 
    }
}

export default connectDB