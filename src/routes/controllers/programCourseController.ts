import { Request, Response, NextFunction } from "express";
import { Repo } from "../../db/repo";
import { Controller } from "./controller";
import prisma from "../../db";

export class ProgramCourseController extends Controller {
  constructor(repo: Repo<any, any, any, any>) {
    super(repo);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.params.program_id as string;
      if (!programId) throw new Error("program_id is required");
      const data = await prisma.programCourse.findMany({
        where: {
          programId,
        },
        select: {
          code: true,
          englishName: true,
          arabicName: true,
        },
      });
      res.status(200).send(data);
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
      const data = await prisma.programCourse.findUnique({
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
