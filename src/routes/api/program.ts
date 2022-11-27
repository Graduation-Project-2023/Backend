import express, { NextFunction, Request, Response } from "express";
import { ProgramRepo } from "../../db/programRepo";

const server = express.Router();
const Program = new ProgramRepo();

// get all programs in college
server.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collegeId = req.query.collegeId as string;
    const programs = await Program.readMany({ collegeId });
    res.status(200).send(programs);
  } catch (err) {
    next(err);
  }
});

// get program by id
server.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const program = await Program.read({ id });
    res.status(200).send(program);
  } catch (err) {
    next(err);
  }
});

// create program
server.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { collegeId, ...data } = req.body;
    const program = await Program.create({
      ...data,
      college: {
        connect: {
          id: collegeId,
        },
      },
    });
    res.status(201).send(program);
  } catch (err) {
    next(err);
  }
});

// update program
server.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const program = await Program.update({ id }, data);
    res.status(200).send(program);
  } catch (err) {
    next(err);
  }
});
