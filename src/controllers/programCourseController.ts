import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";

export class ProgramCourseController extends Controller {
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
              prerequisiteCode: prerequisite,
            })),
          },
        };
      }
      const newData = await this.model.create({
        data: {
          ...data,
          program: {
            connect: {
              id: programId,
            },
          },
          course: {
            connect: {
              id: code,
            },
          },
        },
      });
      res.status(201).send(newData);
    } catch (err) {
      next(err);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.params.code as string;
      const programId = req.params.program_id as string;
      const programId_code = {
        programId,
        code,
      };
      const data = await this.model.findUnique({
        where: {
          programId_code,
        },
        include: {
          prerequisites: {
            select: {
              prerequisiteCode: true,
            },
          },
        },
      });
      res.status(200).send(data);
    } catch (err) {
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
        select: {
          code: true,
          englishName: true,
          arabicName: true,
          level: {
            select: {
              level: true,
            },
          },
        },
      });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };
}
