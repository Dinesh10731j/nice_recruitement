import { Router } from "express";
import { TestimonialsController } from "../../controller/testimonials/testimonials.controller";
import { VerifyToken } from "../../middleware/authentication";
import { requireRole } from "../../middleware/role";

const router = Router();

router.post(
  "/",
  VerifyToken.authenticate,
  requireRole(["admin"]),
  TestimonialsController.create
);
router.get("/", TestimonialsController.findAll);
router.get("/:id", TestimonialsController.findById);
router.patch("/:id", TestimonialsController.update);
router.delete("/:id", TestimonialsController.remove);

export default router;
