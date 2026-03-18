import { Router } from "express";
import { AuthController } from "../../controller/auth/auth.controller";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.post('/logout',AuthController.logout)

export default router;
