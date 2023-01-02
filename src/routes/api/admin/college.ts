import { CollegeController } from "../../../controllers/collegeController";
import express from "express";

const router = express.Router();
const collegeController = new CollegeController();

router.get("/", collegeController.getAll);

router.get("/:id", collegeController.get);

router.post("/", collegeController.create);

router.put("/:id", collegeController.update);

router.delete("/:id", collegeController.delete);

export default router;
