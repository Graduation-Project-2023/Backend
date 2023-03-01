import express from "express";
import { ControllerFactory } from "../../controllers/controllerFactory";
import { AuthController } from "../../controllers/authController";

const router = express.Router();
const authController = ControllerFactory.getController(
  "auth"
) as AuthController;

// const authController = new AuthController();

router.post("/admin_login", authController.login("ADMIN"));

router.post("/student_login", authController.login("STUDENT"));

router.post("/forgot_password", authController.forgetPassword);

router.post("/reset_password/:token", authController.resetPassword);

router.post("/logout", authController.logout);

export default router;
