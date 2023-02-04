import { DepartmentController } from "../../../controllers/departmentController";
import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";

const router = express.Router();
const departmentController = ControllerFactory.getController(
  "department"
) as DepartmentController;

router.post("/", departmentController.create);

router.get("/", departmentController.getAll);

export default router;
