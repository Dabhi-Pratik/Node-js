import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,   
        required: true, 
        trim: true   
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
    },
    productImage:{
        type:String,
        required:true,
    },
    Cloudinary_ID:{
        type:String,
        required:true,
    }
})