import express from "express";
import { CourseInstanceController } from "../../../controllers/courseInstanceController";

const router = express.Router();

const courseInst = new CourseInstanceController();

// get all courses of a professor
router.get(
    "/courses/semester/:semesterId/professor/:professorId",
    courseInst.getByProfessor
);

// get all students of a course
router.get(
    "/courses/:instanceId/students",
    courseInst.getAllStudents
);

// assign marks to a student
router.put(
    "/assign/:instanceId",
    courseInst.assignMarks
);

export default router;