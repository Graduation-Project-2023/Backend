import { Request, Response, NextFunction } from "express";
import { Repo } from "../../db/repo";
import { Controller } from "./controller";

export class ProgramAdminController extends Controller {
  constructor(repo: Repo<any, any, any, any>) {
    super(repo);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.params.program_id as string;
      if (!programId) throw new Error("program_id is required");
      const data = await this.repo.readMany({
        program: {
          id: programId,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { programId, ...data } = req.body;
      const newData = await this.repo.create({
        ...data,
        program: {
          connect: {
            id: programId,
          },
        },
      });
      res.status(201).send(newData);
    } catch (err) {
      next(err);
    }
  };
}
