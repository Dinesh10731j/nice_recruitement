import { Router } from "express";
import { NewsLetterController } from "../../controller/news-letter/news-letter.controller";
import { VerifyToken } from "../../middleware/authentication";
import { requireRole } from "../../middleware/role";

const router = Router();

router.post("/subscribe", NewsLetterController.createSubscription);
router.get(
  "/",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  NewsLetterController.getAllSubscriptions
);
router.get(
  "/:id",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  NewsLetterController.getSubscriptionById
);
router.delete(
  "/:id",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  NewsLetterController.deleteSubscription
);
router.post(
  "/send",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  NewsLetterController.sendNewsletter
);

export default router;
