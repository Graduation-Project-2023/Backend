import { QuestionController } from "../../../controllers/questionController";
import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";

const router = express.Router();
const questionController = ControllerFactory.getController(
  "question"
) as QuestionController;
// const questionController = new QuestionController();

router.get("/:bankId/all", questionController.getAll);

router.get("/:id", questionController.get);

router.post("/", questionController.create);

router.post("/many", questionController.createMany);

router.put("/:id", questionController.update);

router.delete("/:id", questionController.delete);

export default router;
