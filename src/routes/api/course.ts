import express, { NextFunction, Request, Response } from "express";
import { CourseRepo } from "../../db/courseRepo";

const server = express.Router();
const Course = new CourseRepo();

// get all courses in college
server.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collegeId = req.query.collegeId as string;
    const courses = await Course.readMany({ collegeId });
    res.status(200).send(courses);
  } catch (err) {
    next(err);
  }
});

// get course by id
server.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const course = await Course.read({ id });
    res.status(200).send(course);
  } catch (err) {
    next(err);
  }
});

// create course
server.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { collegeId, ...data } = req.body;
    const course = await Course.create({
      ...data,
      college: {
        connect: {
          id: collegeId,
        },
      },
    });
    res.status(201).send(course);
  } catch (err) {
    next(err);
  }
});

export default server;
