import { CourseController } from "../../../controllers/courseController";
import express from "express";

const router = express.Router();
const courseController = new CourseController();

router.get("/", courseController.getAll);

router.get("/:id", courseController.get);

router.post("/", courseController.create);

router.put("/:id", courseController.update);

router.delete("/:id", courseController.delete);

export default router;
