import express from "express";
import multer from "multer";
import storage from "../middleware/upload.js";
import productController from "../controller/productController.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/add", upload.single("image"), productController.createProduct);
router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", upload.single("image"), productController.updateProduct);

export default router;