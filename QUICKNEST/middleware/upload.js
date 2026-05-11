import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import path from "path";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "QuickNest",
//     formate: "webp",
//     allowed_formate: ["jpg", "jpeg", "png", "webp"],
//     transformation: [
//       { width: 1000, height: 1000, crop: "limit" },
//       { quality: "auto" },
//       { fetch_formate: "auto" },
//     ],
//   },
// });

// const uploads = multer({ storage, limits: 5 * 1024 * 1024 });

// export default uploads;

const createUpload = ({
  folder,
  format = [],
  mimeType = [],
  transformation = [],
  fileSize = 5 * 1024 * 1024,
  resource_type = "auto",
}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder,
      allowed_formate: format,
      transformation,
      public_id: file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    }),
  });

  return multer({
    storage,
    limits: {
      fileSize,
      fileFilter: (req, file, cb) => {
        if (mimeType.length === 0 || mimeType.includes(file.mimeType)) {
          cb(null, true);
        } else {
          cb(
            new Error(
              `file format is not valid please select from these file format ${(mimeType.join().split(" "), false)}`,
            ),
          );
        }
      },
    },
  });
};

export const uploadProfile = createUpload({
  folder:"QuickNest/ProfilePicture",
  format:["jpg", "jpeg", "png"],
  mimeType:["image/jpg","image/jpeg","image/png"],
  fileSize:2*1024*1024,
  resource_type:"image",
  transformation:[{height:500,width:500,crop:"fill",gravity:"face",quality:"auto",fetch_formate: "auto"}]
})

export const uploadDocuments = createUpload({
  folder:"QuickNest/documents",
  format:["jpg","jpeg","png","pdf"],
  mimeType:["image/jpg","image/jpeg","image/png","application/pdf"],
  fileSize:15*1024*1024,
  transformation:[{quality:"auto",fetch_formate:"auto"}]
})


