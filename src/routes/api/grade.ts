import express, { NextFunction, Request, Response } from "express";
import { GradeRepo } from "../../db/gradeRepo";

const server = express.Router();
const Grade = new GradeRepo();

// get all grades in program
server.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programId = req.query.programId as string;
    const grades = await Grade.readMany({ programId });
    res.status(200).send(grades);
  } catch (err) {
    next(err);
  }
});

// create grade
server.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { programId, ...data } = req.body;
    const grade = await Grade.create({
      ...data,
      program: {
        connect: {
          id: programId,
        },
      },
    });
    res.status(201).send(grade);
  } catch (err) {
    next(err);
  }
});

// update grade
server.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const grade = await Grade.update({ id }, data);
    res.status(200).send(grade);
  } catch (err) {
    next(err);
  }
});

export default server;
