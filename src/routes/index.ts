import express, { Request, Response } from "express";
import server from "./api/auth";
import admission from "./api/admission";
import program from "./api/program";
import course from "./api/course";
import grade from "./api/grade";
import level from "./api/level";
import programCourse from "./api/programCourse";
import errorHandler from "../middleware/errorHandler";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("API router is working");
});

router.use("/", server);
router.use("/", admission);

router.use("/program", program);
router.use("/course", course);
router.use("/grade", grade);
router.use("/level", level);
router.use("/program_course", programCourse);

router.use(errorHandler);

export default router;
