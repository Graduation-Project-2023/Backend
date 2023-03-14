import express from "express";
import { ControllerFactory } from "../../../controllers/controllerFactory";
import { SuperController } from "../../../controllers/superController";

const router = express.Router();

const superController = ControllerFactory.getController(
  "super"
) as SuperController;


router.get("/", superController.getAll);

router.get("/:collegeId", superController.CollegeAdmins);

router.get("/:id", superController.get);

router.post("/", superController.create);

router.put("/:id", superController.update);

router.delete("/:id", superController.delete);

export default router;