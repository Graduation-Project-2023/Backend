import express, { Request, Response, NextFunction } from "express";
import { LevelAllowedHoursRepo } from "../../db/levelAllowedHoursRepo";

const server = express.Router();
const LevelAllowedHours = new LevelAllowedHoursRepo();

// get all levelAllowedHours in program
server.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programId = req.query.programId as string;
    const levelAllowedHours = await LevelAllowedHours.readMany({
      programId,
    });
    res.status(200).send(levelAllowedHours);
  } catch (err) {
    next(err);
  }
});

// create levelAllowedHours
server.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { programId, ...data } = req.body;
    const levelAllowedHours = await LevelAllowedHours.create({
      ...data,
      program: {
        connect: {
          id: programId,
        },
      },
    });
    res.status(201).send(levelAllowedHours);
  } catch (err) {
    next(err);
  }
});

// update levelAllowedHours
server.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const levelAllowedHours = await LevelAllowedHours.update({ id }, data);
    res.status(200).send(levelAllowedHours);
  } catch (err) {
    next(err);
  }
});
