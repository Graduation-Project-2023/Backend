import { Request, Response, NextFunction } from "express";
import { Repo } from "../../db/repo";
import { Controller } from "./controller";
import { ProgramCourseRepo } from "../../db/programCourseRepo";

const programRepo = new ProgramCourseRepo();

export class ProgramCourseController extends Controller {
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
      const { programId, levelId, code, prerequisites, ...data } = req.body;
      if (!programId) throw new Error("program_id is required");
      if (levelId) {
        data.level = {
          connect: {
            id: levelId,
          },
        };
      }
      if (prerequisites) {
        data.prerequisites = {
          createMany: {
            data: prerequisites.map((prerequisite: string) => ({
              courseCode: prerequisite,
            })),
          },
        };
      }
      const newData = await this.repo.create({
        ...data,
        program: {
          connect: {
            id: programId,
          },
        },
        course: {
          connect: {
            courseCode: code,
          },
        },
      });
      res.status(201).send(newData);
    } catch (err) {
      next(err);
    }
  };
}
