import { Router } from "express";
import { ContactController } from "../../controller/contact/contact.controller";

const router = Router();

router.post("/", ContactController.create);
router.get("/", ContactController.findAll);
router.get("/:id", ContactController.findById);
router.patch("/:id", ContactController.update);
router.delete("/:id", ContactController.remove);

export default router;
