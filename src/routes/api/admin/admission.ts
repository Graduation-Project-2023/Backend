import { StudentController } from "../../../controllers/studentController";
import { uploadSingle, validateCsv, csvToJson } from "../../../middleware/csv";
import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";

const router = express.Router();
const admissionController = ControllerFactory.getController(
  "admission"
) as StudentController;

router.get("/", admissionController.getAll);

router.get("/:id", admissionController.get);

router.post("/", admissionController.create);

router.get("/program/:programId", admissionController.getAllByProgram);

router.post(
  "/many",
  uploadSingle,
  validateCsv,
  csvToJson,
  admissionController.createMany
);

router.post(
  "/scores",
  uploadSingle,
  validateCsv,
  csvToJson,
  admissionController.setManyStudentCourseGrade
);

router.put("/:id", admissionController.update);

router.delete("/:id", admissionController.delete);

export default router;
