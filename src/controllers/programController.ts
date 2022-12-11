import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { Program } from "../models/programs/program";

export class ProgramController extends Controller {
  constructor() {
    super(Program);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collegeId = req.query.college_id as string;
      const data = await this.model.getAll(collegeId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
