import { Router } from "express";
import { BlogsController } from "../../controller/blogs/blogs.controller";
import { VerifyToken } from "../../middleware/authentication";
import { requireRole } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  upload.single("image"),
  BlogsController.create
);
router.get("/", BlogsController.findAll);
router.get("/:id", BlogsController.findById);
router.patch("/:id", upload.single("image"), BlogsController.update);
router.delete("/:id", BlogsController.remove);

export default router;
