import { Request, Response, NextFunction } from "express";
import { Repo } from "../../db/repo";
import { Controller } from "./controller";

export class CollegeAdminController extends Controller {
  constructor(repo: Repo<any, any, any, any>) {
    super(repo);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collegeId = req.query.college_id as string;
      if (!collegeId) throw new Error("college_id is required");
      const data = await this.repo.readMany({ collegeId });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { collegeId, prerequisiteProgramId, ...data } = req.body;

      if (!collegeId) throw new Error("college_id is required");

      if (prerequisiteProgramId) {
        data.prerequisiteProgram = {
          connect: {
            id: prerequisiteProgramId,
          },
        };
      }


      const newData = await this.repo.create({
        ...data,
        college: {
          connect: {
            id: collegeId,
          },
          prerequisiteProgram: prerequisiteConnection,
        },
      });
      res.status(201).send(newData);
    } catch (err) {
      next(err);
    }
  };
}
