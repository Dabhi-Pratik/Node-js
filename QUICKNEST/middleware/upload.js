import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "QuickNest",
    formate: "webp",
    allowed_formate: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 1000, height: 1000, crop: "limit" },
      { quality: "auto" },
      { fetch_formate: "auto" },
    ],
  },
});

const uploads = multer({ storage, limits: 5 * 1024 * 1024 });

export default uploads;
