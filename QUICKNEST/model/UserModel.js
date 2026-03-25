import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "provider", "admin", "super_admin"],
      default: "customer",
    },
    isValid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  const user = this;

  if ((user, this.isModified("password"))) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

userSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Unable to Login");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("Unable to Login");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("user", userSchema);

export default User;
