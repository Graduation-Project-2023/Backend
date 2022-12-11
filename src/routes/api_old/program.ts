import express from "express";
import { CollegeAdminController } from "../../controllers_old/collegeAdminController";
import { ProgramAdminController } from "../../controllers_old/programAdminController";
import { ProgramCourseController } from "../../controllers_old/programCourseController";
import prisma from "../../db";

const server = express.Router();
const programController = new CollegeAdminController(prisma.program);
const programCourseController = new ProgramCourseController(
  prisma.programCourse
);
const levelController = new ProgramAdminController(prisma.level);
const gradeController = new ProgramAdminController(prisma.grade);
const levelAllowedHoursController = new ProgramAdminController(
  prisma.levelAllowedHours
);
const gpaAllowedHoursController = new ProgramAdminController(
  prisma.gpaAllowedHours
);

server.get("/", programController.getAll);

server.get("/:id", programController.get);

server.post("/", programController.create);

server.put("/:id", programController.update);

server.delete("/:id", programController.delete);

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

// ************************************************************************************************
server.get("/:program_id/program_courses", programCourseController.getAll);

server.get("/:program_id/program_courses/:id", programCourseController.get);

server.post("/:program_id/program_courses", programCourseController.create);

// server.put(
//   "/:program_id/program_courses/:code",
//   programCourseController.update
// );

// server.delete(
//   "/:program_id/program_courses/:id",
//   programCourseController.delete
// );

export default server;
