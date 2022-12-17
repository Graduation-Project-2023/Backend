import express from "express";
import { ControllerFactory } from "../../controllers/controllerFactory";
import { CourseInstanceController } from "../../controllers/courseInstanceController";

const router = express.Router();
const courseInstanceController = ControllerFactory.getController(
  "courseInstance"
) as CourseInstanceController;

router.get(
  "/semesters/:semester_id/levels/:level_id",
  courseInstanceController.getAll
);

router.get(
  "/semesters/:semester_id/programs/:program_id",
  courseInstanceController.getAllByProgram
);

router.get(
  "/semesters/:semester_id/levels/:level_id/:id",
  courseInstanceController.get
);

router.post(
  "/semesters/:semester_id/levels/:level_id",
  courseInstanceController.create
);

router.put(
  "/semesters/:semester_id/levels/:level_id/:id",
  courseInstanceController.update
);

router.delete(
  "/semesters/:semester_id/levels/:level_id/:id",
  courseInstanceController.delete
);

export default router;
