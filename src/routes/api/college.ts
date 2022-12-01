import express, { NextFunction, Request, Response } from "express";
import { CollegeRepo } from "../../db/collegeRepo";
import { Controller } from "../controllers/controller";

const router = express.Router();
const College = new CollegeRepo();
const collegeController = new Controller(College);

router.get("/", collegeController.getAll);

router.get("/:id", collegeController.get);

router.post("/", collegeController.create);

router.put("/:id", collegeController.update);

router.delete("/:id", collegeController.delete);

export default router;
