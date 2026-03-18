import { Router } from "express";
import { ClientsController } from "../../controller/clients/clients.controller";
import { VerifyToken } from "../../middleware/authentication";
import { requireRole } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  upload.single("logo"),
  ClientsController.create
);
router.get("/", ClientsController.findAll);
router.get("/:id", ClientsController.findById);
router.patch("/:id", upload.single("logo"), ClientsController.update);
router.delete("/:id", ClientsController.remove);

export default router;
