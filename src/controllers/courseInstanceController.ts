import { Controller } from "./controller";
import { Request, Response, NextFunction } from "express";
import { CourseInstance } from "../models/courseInstance";

export class CourseInstanceController extends Controller {
  constructor() {
    super(CourseInstance);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const academicSemesterId = req.params.semester_id as string;
      const levelId = req.params.level_id as string;
      const data = await this.model.getAll({
        AND: [{ academicSemesterId }, { levelId }],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getAllByProgram = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const academicSemesterId = req.params.semester_id as string;
      const programId = req.params.program_id as string;
      const data = await this.model.getAll({
        AND: [{ academicSemesterId }, { programId }],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getByProfessor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const academicSemesterId = req.params.semesterId as string;
      const professorId = req.params.professorId as string;
      const data = await this.model.getProfessorInstances({
        AND: [{ academicSemesterId }, { professorId }],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.instanceId as string;
      const data = await this.model.getAllStudents(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.studentId as string;
      const data = await this.model.getStudents(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  assignProfessor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.instanceId as string;
      const professorId = req.params.professorId as string;
      const data = await this.model.assignProfessor(
        professorId,
        id
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  assignMarks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.instanceId as string;
      const marks = req.body as any[];
      for (const mark of marks) {
        await this.model.assignMarks(
          id,
          mark
        );
      }
      res.status(200).json({data: "success"});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
