import { Router } from "express";
import { GalleryController } from "../../controller/gallery/gallery.controller";
import { VerifyToken } from "../../middleware/authentication";
import { isAdmin } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/create",
  VerifyToken.authenticate,
isAdmin,
  upload.array("image",10),
  GalleryController.create
);
router.get("/find-all", GalleryController.findAll);
router.get("/:id", GalleryController.findById);
router.patch("/update/:id", upload.single("image"), GalleryController.update);
router.delete("/remove/:id", GalleryController.remove);

export default router;
