import express from "express";
import { PaymentController } from "../../../controllers/paymentController";

const router = express.Router();

const paymentController = new PaymentController();

router.post("/void", paymentController.void);

router.post("/refund", paymentController.refund);

router.get("/trx/:transactionId", paymentController.getById);

router.get("/trx/email/:email", paymentController.getByEmail);

router.get("/all_trxs", paymentController.getAll);

export default router;