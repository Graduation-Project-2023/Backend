import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import prisma from "../db";

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
          connect: prerequisites.map((prerequisite: string) => ({
            id: prerequisite,
          })),
        };
      }
      const course = await prisma.course.findUnique({
        where: {
          id: code,
        },
        select: {
          englishName: true,
          arabicName: true,
        },
      });
      if (!course) throw new Error("course not found");
      data.englishName = data.englishName
        ? data.englishName
        : course.englishName;
      data.arabicName = data.arabicName ? data.arabicName : course.arabicName;
      const newData = await prisma.programCourse.create({
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
      const id = req.params.id as string;
      const data = await prisma.programCourse.findUnique({
        where: {
          id,
        },
        include: {
          prerequisites: {
            select: {
              code: true,
            },
          },
        },
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const programId = req.params.program_id as string;
      if (!programId) throw new Error("program_id is required");
      const data = await prisma.programCourse.findMany({
        where: {
          programId,
        },
        select: {
          id: true,
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
