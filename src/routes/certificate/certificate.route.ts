import { Router } from "express";
import { CertificateController } from "../../controller/certificate/certificate.controller";
import { VerifyToken } from "../../middleware/authentication";
import { requireRole } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  upload.single("image"),
  CertificateController.create
);
router.get("/", CertificateController.findAll);
router.get("/:id", CertificateController.findById);
router.patch("/:id", upload.single("image"), CertificateController.update);
router.delete("/:id", CertificateController.remove);

export default router;
