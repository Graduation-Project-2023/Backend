import express, { NextFunction, Request, Response } from "express";
import { ProgramRepo } from "../../db/programRepo";
import { CollegeAdminController } from "../controllers/collegeAdminController";
import { ProgramAdminController } from "../controllers/programAdminController";
import { LevelRepo } from "../../db/levelRepo";
import { GradeRepo } from "../../db/gradeRepo";
import { LevelAllowedHoursRepo } from "../../db/levelAllowedHoursRepo";
import { GpaAllowedHoursRepo } from "../../db/gpaAllowedHoursRepo";

const server = express.Router();
const Program = new ProgramRepo();
const Level = new LevelRepo();
const Grade = new GradeRepo();
const LevelAllowedHours = new LevelAllowedHoursRepo();
const GpaAllowedHours = new GpaAllowedHoursRepo();
const controller = new CollegeAdminController(Program);
const levelController = new ProgramAdminController(Level);
const gradeController = new ProgramAdminController(Grade);
const levelAllowedHoursController = new ProgramAdminController(
  LevelAllowedHours
);
const gpaAllowedHoursController = new ProgramAdminController(GpaAllowedHours);

server.get("/", controller.getAll);

server.get("/:id", controller.get);

server.post("/", controller.create);

server.put("/:id", controller.update);

server.delete("/:id", controller.delete);

// ************************************************************************************************
server.get("/:program_id/levels", levelController.getAll);

server.post("/:program_id/levels", levelController.create);

server.put("/:program_id/levels/:id", levelController.update);

server.delete("/:program_id/levels/:id", levelController.delete);

// ************************************************************************************************
server.get("/:program_id/grades", gradeController.getAll);

server.post("/:program_id/grades", gradeController.create);

server.put("/:program_id/grades/:id", gradeController.update);

server.delete("/:program_id/grades/:id", gradeController.delete);

// ************************************************************************************************
server.get(
  "/:program_id/level_allowed_hours",
  levelAllowedHoursController.getAll
);

server.post(
  "/:program_id/level_allowed_hours",
  levelAllowedHoursController.create
);

server.put(
  "/:program_id/level_allowed_hours/:id",
  levelAllowedHoursController.update
);

server.delete(
  "/:program_id/level_allowed_hours/:id",
  levelAllowedHoursController.delete
);

// ************************************************************************************************
server.get("/:program_id/gpa_allowed_hours", gpaAllowedHoursController.getAll);

server.post("/:program_id/gpa_allowed_hours", gpaAllowedHoursController.create);

server.put(
  "/:program_id/gpa_allowed_hours/:id",
  gpaAllowedHoursController.update
);

server.delete(
  "/:program_id/gpa_allowed_hours/:id",
  gpaAllowedHoursController.delete
);

export default server;
