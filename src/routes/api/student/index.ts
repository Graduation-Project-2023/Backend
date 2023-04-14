import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";
import { StudentController } from "../../../controllers/studentController";
import { SheetInstanceController } from "../../../controllers/sheetInstanceController";
import { Assist } from "../../../controllers/assist";
import student from "./info";

const studentController = ControllerFactory.getController(
  "student"
) as StudentController;

const sheetInstance = new SheetInstanceController();

const router = express.Router();

router.get("/available_courses", studentController.getStudentAvailableCourses);

router.get("/available_classes", studentController.getStudentAvailableClasses);

router.get("/table", studentController.getStudentTable);

router.post("/register", studentController.studentRegister);

router.post("/assist", new Assist().answer);

router.put("/quiz/:id", sheetInstance.update);

router.get("/quizzes", sheetInstance.getSheetByUser);

router.put("/register/update", studentController.updateStudentRegister);

router.use("/info", student);

export default router;
