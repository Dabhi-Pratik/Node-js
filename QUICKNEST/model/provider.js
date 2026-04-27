import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  experience: {
    type: Number,
    default: 0,
  },
  documents: [
    {
      type: String,
      required: true,
    },
  ],
  isValid: {
    type: Boolean,
    default: false,
  },
});

const Provider = mongoose.model("Provider", providerSchema);

export default Provider
