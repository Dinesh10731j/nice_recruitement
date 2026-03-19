import { Router } from "express";
import { AdvertiseController } from "../../controller/advertise/advertise.controller";
import { VerifyToken } from "../../middleware/authentication";
import { isAdmin } from "../../middleware/role";
import { upload } from "../../middleware/upload";


const router = Router();

router.post(
  "/create",
  VerifyToken.authenticate,
  isAdmin,
  upload.single("image"),
  AdvertiseController.create
);
router.get("/", AdvertiseController.findAll);
router.get("/:id", AdvertiseController.findById);
router.patch(
  "update/:id",
  VerifyToken.authenticate,
 isAdmin,
  upload.single("image"),
  AdvertiseController.update
);
router.delete(
  "/:id",
  VerifyToken.authenticate,
  isAdmin,
  AdvertiseController.remove
);

export default router;
