import express from "express";
import providerController from "../controller/providerController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { uploadDocuments } from "../middleware/upload.js";

const router = express.Router();

router.post("/registerAsProvider",uploadDocuments.array("documents",3) ,auth, providerController.registerAsProvider);

router.get(
  "/getProvider",
  auth,
  checkRole("admin", "super_admin"),
  providerController.getProvider,
);

router.get(
  "/getProviderBooking:id",
  auth,
  checkRole("provider", "admin", "super_admin"),
  providerController.getProviderBooking,
);

export default router;
