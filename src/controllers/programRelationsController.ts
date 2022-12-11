import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { ProgramRelationModel } from "../models/programs/programRelations";

export class ProgramRelationsController extends Controller {
  constructor(model: ProgramRelationModel) {
    super(model);
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
}
