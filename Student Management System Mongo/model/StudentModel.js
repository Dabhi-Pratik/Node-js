import mongoose from "mongoose"

// const StudentModel = mongoose.model("student",{
//     firstName:{
//         type:String,
//         require:true,
//         trim:true,
//     },
//     lastName:{
//        type:String,
//         require:true,
//         trim:true, 
//     },
//     email:{
//         type:String,
//         require:true,
//         trim:true,
//         unique:true,
//     },
//     phoneNumber:{
//         type:true,
//         require:true,
//         trim:true,
//         min:10,
//     },
//     course:{
//         type:String,
//         require:true,
//         enum:["Fullstack Development","Graphic Designer","video Editor","Ui/ux"],
//     },
//     isActive:{
//         enum:["pending","terminate","active","suspend"]
//     },
// },timeTemp)

// export default StudentModel;

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        min: 10,
    },
    course: {
        type: String,
        required: true,
        enum: ["Fullstack Development", "Graphic Designer", "video Editor", "Ui/ux"],
    },
    isActive: {
        enum: ["pending", "terminate", "active", "suspend"]
    },
})

export default StudentSchema;