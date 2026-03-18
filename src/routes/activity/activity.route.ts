import { Router } from "express";
import { ActivityController } from "../../controller/activity/activity.controller";
import { VerifyToken } from "../../middleware/authentication";
import { isAdmin } from "../../middleware/role";

const router = Router();

router.get(
  "/",
  VerifyToken.authenticate,
 isAdmin,
  ActivityController.list
);

export default router;
