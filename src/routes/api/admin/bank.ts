import { BankController } from "../../../controllers/bankController";
import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";

const router = express.Router();
const bankController = ControllerFactory.getController(
  "bank"
) as BankController;
// const bankController = new BankController();

router.get("/", bankController.getAll);

router.get("/:id", bankController.get);

router.post("/", bankController.create);

router.put("/:id", bankController.update);

router.delete("/:id", bankController.delete);

export default router;
