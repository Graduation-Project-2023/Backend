import express from "express";
import program from "./program";
import course from "./course";
import classesTable from "./classesTable";
import courseIntance from "./courseInstance";
import professor from "./professor";
import admission from "./admission";
import department from "./department";
import student from "../student/index";
import bank from "./bank"
import question from "./question"
import sheet from "./sheet"

const router = express.Router();

router.use("/student", admission);
router.use("/programs", program);
router.use("/courses", course);
router.use("/professor", professor);
router.use("/classes_tables", classesTable);
router.use("/course_instances", courseIntance);
router.use("/departments", department);
router.use("/bank", bank);
router.use("/question", question);
router.use("/sheet", sheet);
router.use("/view", student);

export default router;