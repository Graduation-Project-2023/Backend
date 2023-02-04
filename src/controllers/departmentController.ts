import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { DepartmentService } from "../services/department";

export class DepartmentController extends Controller {
  constructor() {
    super(DepartmentService);
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
