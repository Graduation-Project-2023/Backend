import express from "express";
import { ControllerFactory } from "../../controllers/controllerFactory";
import { AcquireController } from "../../controllers/acquireController";

const router = express.Router();

const acuireController = ControllerFactory.getController(
  "acquire"
) as AcquireController;
// const acuireController = new AcquireController();

router.post("/acquire_credentials", acuireController.obtain);

export default router;