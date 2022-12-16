import express from "express";
import { ClassesTableController } from "../../controllers/classesTableController";
import { ControllerFactory } from "../../controllers/controllerFactory";

const router = express.Router();
const classesTableController = ControllerFactory.getController(
  "classesTable"
) as ClassesTableController;

router.get(
  "/semesters/:semester_id/programs/:program_id",
  classesTableController.getAll
);

router.get(
  "/semesters/:semester_id/programs/:program_id/:level_id",
  classesTableController.get
);

router.post(
  "/semesters/:semester_id/programs/:program_id",
  classesTableController.create
);

router.put(
  "/semesters/:semester_id/programs/:program_id/:id",
  classesTableController.update
);

router.delete(
  "/semesters/:semester_id/programs/:program_id/:id",
  classesTableController.delete
);

export default router;
