import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { CourseInstance } from "../models/courseInstance";

export class CourseInstanceController extends Controller {
  constructor() {
    super(CourseInstance);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const academicSemesterId = req.params.semester_id as string;
      const levelId = req.params.level_id as string;
      const data = await this.model.getAll({
        AND: [{ academicSemesterId }, { levelId }],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getAllByProgram = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const academicSemesterId = req.params.semester_id as string;
      const programId = req.params.program_id as string;
      const data = await this.model.getAll({
        AND: [{ academicSemesterId }, { programId }],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
