import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";
import { StudentController } from "../../../controllers/studentController";
import student from "./info";

const studentController = ControllerFactory.getController(
  "student"
) as StudentController;

const router = express.Router();

router.get(
  "/available_courses",  // studentId
  studentController.getStudentAvailableCourses
);

router.get(
  "/available_classes",   // semesterId, studentId
  studentController.getStudentAvailableClasses
);

router.get(
  "/table",   // studentId, academic_semester_id  
  studentController.getStudentTable
);

router.post(
  "/register",    // studentId, academic_semester_id
  studentController.studentRegister
);

router.put("/register/update", studentController.updateStudentRegister);  // tableId, studentId

router.use("/info", student);

export default router;