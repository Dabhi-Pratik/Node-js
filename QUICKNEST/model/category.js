import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJson: { virtual: true },
    toObject: { virtual: true },
  }
);

categorySchema.virtual("service", {
  ref: "Service",
  localField: "_id",
  foreignField: "category",
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
