import express, { NextFunction, Request, Response } from "express";
import { ProgramCourseRepo } from "../../db/programCourseRepo";

const server = express.Router();
const ProgramCourse = new ProgramCourseRepo();

// get all programCourses in program
server.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programId = req.query.programId as string;
    const programCourses = await ProgramCourse.readMany({ programId });
    res.status(200).send(programCourses);
  } catch (err) {
    next(err);
  }
});

// get programCourse by id
server.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const programCourse = await ProgramCourse.read(
      { id },
      { include: { course: true } }
    );
    res.status(200).send(programCourse);
  } catch (err) {
    next(err);
  }
});

// create programCourse
server.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { programId, courseId, levelId, prerequisiteId, ...data } = req.body;
    const programCourse = await ProgramCourse.create({
      ...data,
      program: {
        connect: {
          id: programId,
        },
      },
      course: {
        connect: {
          id: courseId,
        },
      },
      level: {
        connect: {
          id: levelId,
        },
      },
      prerequisite: {
        connect: {
          id: prerequisiteId,
        },
      },
    });
    res.status(201).send(programCourse);
  } catch (err) {
    next(err);
  }
});

// edit programCourse
server.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const programCourse = await ProgramCourse.update({ id }, data);
    res.status(200).send(programCourse);
  } catch (err) {
    next(err);
  }
});
