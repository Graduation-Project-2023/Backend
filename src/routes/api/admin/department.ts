import { DepartmentController } from "../../../controllers/departmentController";
import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";

const router = express.Router();
const departmentController = ControllerFactory.getController(
  "department"
) as DepartmentController;

router.post("/", departmentController.create);

router.get("/", departmentController.getAll);

router.get("/:id", departmentController.get);

router.put("/:id", departmentController.update);

router.delete("/:id", departmentController.delete);

export default router;
