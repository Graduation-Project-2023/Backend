import express from "express";
import { ControllerFactory } from "../../controllers/controllerFactory";
import { AuthController } from "../../controllers/authController";

const router = express.Router();
const authController = ControllerFactory.getController(
  "auth"
) as AuthController;

router.post("/login", authController.login);

router.post("/forgot_password", authController.forgetPassword);

router.post("/reset_password/:token", authController.resetPassword);

router.get("/logout", authController.logout);

export default router;
