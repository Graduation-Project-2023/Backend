import express, { Request, Response } from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";
import { StudentController } from "../../../controllers/studentController";

const studentController = ControllerFactory.getController(
  "student"
) as StudentController;

const router = express.Router();

router.get(
  "/available_courses/:student_id",
  studentController.getStudentAvailableCourses
);

router.get(
  "/available_classes/:semester_id/:student_id",
  studentController.getStudentAvailableClasses
);

export default router;
