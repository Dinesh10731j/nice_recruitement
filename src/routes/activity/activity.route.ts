import { Router } from "express";
import { ActivityController } from "../../controller/activity/activity.controller";
import { VerifyToken } from "../../middleware/authentication";
import { requireRole } from "../../middleware/role";

const router = Router();

router.get(
  "/",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  ActivityController.list
);

export default router;
