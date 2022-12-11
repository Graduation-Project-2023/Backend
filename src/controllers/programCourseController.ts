import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { ProgramCourse } from "../models/programs/programCourse";

export class ProgramCourseController extends Controller {
  constructor() {
    super(ProgramCourse);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.params.program_id as string;
      const data = await this.model.getAll(programId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.params.program_id as string;
      const courseCode = req.params.courseCode as string;
      const data = await this.model.getByCode(programId, courseCode);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
