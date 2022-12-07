import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import prisma from "../db";

export class CollegeAdminController extends Controller {
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

      const newData = await this.model.create({
        data: {
          ...data,
          college: {
            connect: {
              id: collegeId,
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
      const collegeId = req.query.college_id as string;
      if (!collegeId) throw new Error("college_id is required");
      const data = await this.model.findMany({
        where: {
          collegeId,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };
}
