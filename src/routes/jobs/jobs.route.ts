import { Router } from "express";
import { JobsController } from "../../controller/jobs/jobs.controller";
import { VerifyToken } from "../../middleware/authentication";
import { isAdmin } from "../../middleware/role";
import { upload } from "../../middleware/upload";

const router = Router();

router.post(
  "/create",
  VerifyToken.authenticate,
  isAdmin,
  upload.single("image"),
  JobsController.create
);
router.get("/find-all", JobsController.findAll);
router.get("/:id", JobsController.findById);
router.patch("/update/:id", upload.single("image"), JobsController.update);
router.delete("/remove/:id", JobsController.remove);

export default router;
