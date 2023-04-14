import { SheetController } from "../../../controllers/sheetController";
import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";

const router = express.Router();
// const bankController = ControllerFactory.getController(
//   "bank"
// ) as BankController;
const sheetController = new SheetController();

router.get("/", sheetController.getAll);

router.get("/:id", sheetController.get);

router.post("/", sheetController.create);

router.post("/add", sheetController.addQuestions);

router.post("/remove", sheetController.removeQuestions);

router.put("/:id", sheetController.update);

router.delete("/:id", sheetController.delete);

export default router;
