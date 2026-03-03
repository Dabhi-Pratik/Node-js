import express from "express";
import multer from "multer";
import storage from "../middleware/cloudinaryStorage.js";
import productController from "../controllers/productController.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/add", upload.single("image"), productController.createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getAllProducts);
router.delete("/:id", deleteProduct);

export default router;