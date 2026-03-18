import { Router } from "express";
import { AdvertiseController } from "../../controller/advertise/advertise.controller";
import { VerifyToken } from "../../middleware/authentication";
import { requireRole } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  upload.single("image"),
  AdvertiseController.create
);
router.get("/", AdvertiseController.findAll);
router.get("/:id", AdvertiseController.findById);
router.patch(
  "/:id",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  upload.single("image"),
  AdvertiseController.update
);
router.delete(
  "/:id",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  AdvertiseController.remove
);

export default router;
