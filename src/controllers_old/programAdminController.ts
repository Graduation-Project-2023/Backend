import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";

export class ProgramAdminController extends Controller {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { programId, ...data } = req.body;
      const newData = await this.model.create({
        data: {
          ...data,
          program: {
            connect: {
              id: programId,
            },
          },
        },
      });
      res.status(201).send(newData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.params.program_id as string;
      if (!programId) throw new Error("program_id is required");
      const data = await this.model.findMany({
        where: {
          programId,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };
}
