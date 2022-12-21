import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { Student } from "../models/student";
import mapCsvRowToStudentCreateInput from "../utils/map";

export class admissionController extends Controller {
  constructor() {
    super(Student);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collegeId = req.params.collegeId as string;
      const data = await this.model.getAll(collegeId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  bulk = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jsonData } = req.body;
      if (!req.query.collegeId) {
        return next({
            status: 400,
            message: "College id is required",
            });
        }
      let failed: any[] = [];
      // map csv data to student create input in parallel due to async nature of bcrypt
      const studentInputs = await Promise.all(
        jsonData.map(mapCsvRowToStudentCreateInput)
      );
      // create all students in parallel
      await Promise.all(
        studentInputs.map(async (student) => {
          student.collegeId = req.query.collegeId;
          if (student.nationalId.length != 14 || !student.nationalId) {
            failed.push(student);
            return;
          }
          try {
            await this.model.create(student);
          } catch (err) {
            console.error(err);
            next({
              status: 400,
              message: "Unique constraint/s failed",
            });
          }
        })
      );
      res.status(201).send(failed);
    } catch (error) {
      return next({
        status: 400,
        message: "Error creating students",
      });
    }
  };
}
