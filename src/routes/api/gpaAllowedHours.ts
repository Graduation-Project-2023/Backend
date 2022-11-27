import express, { Request, Response, NextFunction } from "express";
import { GpaAllowedHoursRepo } from "../../db/gpaAllowedHoursRepo";

const server = express.Router();
const GpaAllowedHours = new GpaAllowedHoursRepo();

// get all gpaAllowedHours in program
server.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const programId = req.query.programId as string;
    const gpaAllowedHours = await GpaAllowedHours.readMany({ programId });
    res.status(200).send(gpaAllowedHours);
  } catch (err) {
    next(err);
  }
});

// create gpaAllowedHours
server.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { programId, ...data } = req.body;
    const gpaAllowedHours = await GpaAllowedHours.create({
      ...data,
      program: {
        connect: {
          id: programId,
        },
      },
    });
    res.status(201).send(gpaAllowedHours);
  } catch (err) {
    next(err);
  }
});

// update gpaAllowedHours
server.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const gpaAllowedHours = await GpaAllowedHours.update({ id }, data);
    res.status(200).send(gpaAllowedHours);
  } catch (err) {
    next(err);
  }
});
