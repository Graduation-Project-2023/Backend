import express from "express";
import { PaymentController } from "../../controllers/paymentController";

const router = express.Router();

const paymentController = new PaymentController();

router.post("/callback", paymentController.callback);

export default router;