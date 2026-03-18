import { Router } from "express";
import { ContactController } from "../../controller/contact/contact.controller";

const router = Router();

router.post("/create", ContactController.create);
router.get("/find-all", ContactController.findAll);
router.get("/:id", ContactController.findById);
router.patch("/update/:id", ContactController.update);
router.delete("/remove/:id", ContactController.remove);

export default router;
