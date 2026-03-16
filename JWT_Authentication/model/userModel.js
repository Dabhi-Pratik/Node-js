import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: (value) => {
            if (!value.endsWith("@gmail.com")) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: (value) => {
            if (value.toLowerCase() === "password") {
                throw new Error("Password can't contain password word as password")
            }
        }

    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

UserSchema.pre("save", async function () {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

UserSchema.statics.findByCredentials = async function (email, password) {
    try {
        const user = await this.findOne({ email })

        if (!user) {
            throw new Error("Unable to Login")
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            throw new Error("Unable to Login")
        }

        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

UserSchema.methods.generateAuthToken = async function () {
    try {
        const user = this

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

        if (!token) {
            throw new Error("Failed to generate aut Token")
        }


        user.tokens = user.tokens.concat({ token })

        await user.save()
    } catch (error) {
        throw new Error(error.message)
    }
}

const User = mongoose.model("User", UserSchema)

export default User