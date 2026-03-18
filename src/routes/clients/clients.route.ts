import { Router } from "express";
import { ClientsController } from "../../controller/clients/clients.controller";
import { VerifyToken } from "../../middleware/authentication";
import { isAdmin } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/create",
  VerifyToken.authenticate,
 isAdmin,
  upload.single("logo"),
  ClientsController.create
);
router.get("/", ClientsController.findAll);
router.get("/:id", ClientsController.findById);
router.patch("/:id", upload.single("logo"), ClientsController.update);
router.delete("/:id", ClientsController.remove);

export default router;
