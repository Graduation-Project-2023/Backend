import express from "express";
import { auth } from "../../controllers/authController";

const router = express.Router();
const authController = new auth();

router.post("/login", authController.login);

router.post("/forgot_password", authController.forgetPassword);

router.post("/reset_password/:token", authController.resetPassword);

router.get("/logout", authController.logout);

export default router;
