import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { Super } from "../models/super";

export class SuperController extends Controller {
  constructor() {
    super(Super);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.getAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  CollegeAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collegeId = req.params.collegeId as string;
      const data = await this.model.getCollegeAdmins(collegeId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

}
