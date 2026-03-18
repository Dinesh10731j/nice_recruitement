import { Router } from "express";
import { ServicesController } from "../../controller/services/services.controller";
import { VerifyToken } from "../../middleware/authentication";
import { isAdmin } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/create",
  VerifyToken.authenticate,
 isAdmin,
  upload.single("image"),
  ServicesController.create
);
router.get("/find-all", ServicesController.findAll);
router.get("/:id", ServicesController.findById);
router.patch("/update/:id", upload.single("image"), ServicesController.update);
router.delete("/remove/:id", ServicesController.remove);

export default router;
