import express from "express";
import { professorController } from "../../controllers/professorController";

const router = express.Router();
const pc = new professorController();

router.get("/all/:collegeId", pc.getAll);

router.get("/:id", pc.get);

router.post("/", pc.create);

router.put("/:id", pc.update);

router.delete("/:id", pc.delete);

export default router;
