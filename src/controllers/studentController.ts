import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { StudentService } from "../services/studentService";

export class StudentController extends Controller {
  constructor() {
    super(StudentService);
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

  getStudentAvailableCourses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const studentId = req.params.student_id;
      const data = await this.model.getStudentAvailableCourses(studentId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  getStudentAvailableClasses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const semesterId = req.params.semester_id;
      const studentId = req.params.student_id;
      const data = await this.model.getStudentAvailableClasses(
        semesterId,
        studentId
      );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  createMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jsonData } = req.body;
      const collegeId = req.query.collegeId as string;
      const departmentId = req.query.departmentId as string;
      await this.model.createMany(collegeId, departmentId, jsonData);
      res.status(201).json("success");
    } catch (error) {
      next(error);
    }
  };
}
