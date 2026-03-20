import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (!value.endsWith("@gmail.com")) {
                throw new Error("Invalid Email")
            }
        }
    },
    googleId: {
        type: String
    }
})


const User = mongoose.model("user", userSchema)

export default User