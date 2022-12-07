import express from "express";
import { Controller } from "../../controllers/controller";
import prisma from "../../db";

const router = express.Router();
const collegeController = new Controller(prisma.college);

router.get("/", collegeController.getAll);

router.get("/:id", collegeController.get);

router.post("/", collegeController.create);

router.put("/:id", collegeController.update);

router.delete("/:id", collegeController.delete);

export default router;
