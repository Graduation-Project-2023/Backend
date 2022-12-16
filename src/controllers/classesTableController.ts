import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { ClassesTableService } from "../services/classesTable";

export class ClassesTableController extends Controller {
  constructor() {
    super(ClassesTableService);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.query.program_id as string;
      const semesterId = req.query.semester_id as string;
      const data = await this.model.getAll(programId, semesterId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
