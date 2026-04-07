import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  duration:{
    type:Number
  },
  isActive:{
    type:Boolean,
    default:true
  },
  description:{
    type:String,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
});

const Service = mongoose.model("Service", serviceSchema);

export default Service
