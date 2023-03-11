import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";
import { StudentController } from "../../../controllers/studentController";
import student from "./info";

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

router.get(
  "/table/:student_id/:academic_semester_id",
  studentController.getStudentTable
);

router.post(
  "/register/:student_id/:academic_semester_id",
  studentController.studentRegister
);

router.put("/register/:table_id", studentController.updateStudentRegister);

router.use("/info", student);

export default router;
