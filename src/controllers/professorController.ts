import { Controller } from "./controller";
import { Professor } from "../models/professor";
import { Request, Response, NextFunction } from "express";

export class professorController extends Controller {
  constructor() {
    super(Professor);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collegeId = req.params.collegeId as string;
      const data = await this.model.getAll(collegeId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
