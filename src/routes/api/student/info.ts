import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";
import { StudentInfoController } from "../../../controllers/studentInfoController";

const router = express.Router();

const studentInfoController = ControllerFactory.getController(
  "studentInfo"
) as StudentInfoController;
// const studentInfoController = new StudentInfoController();

router.get("/", studentInfoController.get_info);

export default router;