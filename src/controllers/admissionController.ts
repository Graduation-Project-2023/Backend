import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { Student } from "../models/student";
import { User } from "../models/user";
import {
  mapCsvRowToStudentCreateInput,
  mapCsvRowToUserCreateInput,
  getUserInputs,
  getStudentInputs,
} from "../utils/mapAdmissionData";
import { AdmissionService } from "../services/admissionService";

export class AdmissionController extends Controller {
  constructor() {
    super(AdmissionService);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collegeId = req.query.collegeId;
      const data = await this.model.getAll(collegeId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  // bulk = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { jsonData } = req.body;
  //     if (!req.query.collegeId) {
  //       return next({
  //         status: 400,
  //         message: "College id is required",
  //       });
  //     }
  //     const failed: any[] = [];
  //     // map csv data to student create input in parallel due to async nature of bcrypt
  //     const studentInputs = jsonData.map(mapCsvRowToStudentCreateInput);
  //     // create all students in parallel
  //     await Promise.all(
  //       studentInputs.map(async (student: any) => {
  //         student.collegeId = req.query.collegeId;
  //         if (student.nationalId.length != 14 || !student.nationalId) {
  //           failed.push(student);
  //           return;
  //         }
  //         try {
  //           await this.model.create(student);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       })
  //     );
  //     res.status(201).send(failed);
  //   } catch (error) {
  //     return next({
  //       status: 400,
  //       message: "Error creating students",
  //     });
  //   }
  // };

  createMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jsonData } = req.body;
      const collegeId = req.query.collegeId as string;
      await this.model.createMany(collegeId, jsonData);
      res.status(201).json("success");
    } catch (error) {
      next(error);
    }
  };
}
