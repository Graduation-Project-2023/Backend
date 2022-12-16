import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { ClassesTableService } from "../services/classesTable";

export class ClassesTableController extends Controller {
  constructor() {
    super(ClassesTableService);
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const semesterId = req.params.semester_id;
      const levelId = req.params.level_id;
      const data = await this.model.get({
        levelId_semesterId: {
          levelId,
          semesterId,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.query.program_id as string;
      const semesterId = req.query.semester_id as string;
      const data = await this.model.getAll({
        AND: [{ programId }, { semesterId }],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
