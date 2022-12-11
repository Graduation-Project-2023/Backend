import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { College } from "../models/college";

export class CollegeController extends Controller {
  constructor() {
    super(College);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.getAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
