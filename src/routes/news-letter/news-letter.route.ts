import { Router } from "express";
import { NewsLetterController } from "../../controller/news-letter/news-letter.controller";
import { VerifyToken } from "../../middleware/authentication";
import { isAdmin } from "../../middleware/role";
const router = Router();

router.post("/subscribe", NewsLetterController.createSubscription);
router.get(
  "/",
  VerifyToken.authenticate,
  isAdmin,
  NewsLetterController.getAllSubscriptions
);
router.get(
  "/:id",
  VerifyToken.authenticate,
  isAdmin,
  NewsLetterController.getSubscriptionById
);
router.delete(
  "/:id",
  VerifyToken.authenticate,
  isAdmin,
  NewsLetterController.deleteSubscription
);
router.post(
  "/send",
  VerifyToken.authenticate,
  isAdmin,
  NewsLetterController.sendNewsletter
);

export default router;
