import { Controller } from "./controller";
import { CourseController } from "./courseController";
import { ProgramController } from "./programController";
import { CollegeController } from "./collegeController";
import { ProgramCourseController } from "./programCourseController";
import { ProgramRelationsController } from "./programRelationsController";
import { StudentController } from "./studentController";
import {
  Level,
  Grade,
  LevelAllowedHours,
  GpaAllowedHours,
} from "../models/programs/programRelations";
import { ClassesTableController } from "./classesTableController";
import { CourseInstanceController } from "./courseInstanceController";
import { AuthController } from "./authController";
import { DepartmentController } from "./departmentController";
import { AcquireController } from "./acquireController";
import { StudentInfoController } from "./studentInfoController";
import { SuperController } from "./superController";

export class ControllerFactory {
  static getController = (controller: string): Controller => {
    switch (controller) {
      case "course":
        return new CourseController();
      case "program":
        return new ProgramController();
      case "programCourse":
        return new ProgramCourseController();
      case "level":
        return new ProgramRelationsController(new Level());
      case "grade":
        return new ProgramRelationsController(new Grade());
      case "levelAllowedHours":
        return new ProgramRelationsController(new LevelAllowedHours());
      case "gpaAllowedHours":
        return new ProgramRelationsController(new GpaAllowedHours());
      case "auth":
        return new AuthController();
      case "acquire":
        return new AcquireController();
      case "classesTable":
        return new ClassesTableController();
      case "courseInstance":
        return new CourseInstanceController();
      case "admission":
        return new StudentController();
      case "student":
        return new StudentController();
      case "department":
        return new DepartmentController();
      // super  cases
      case "super":
        return new SuperController();
      case "college":
        return new CollegeController();
      // student cases
      case "studentInfo":
        return new StudentInfoController();
      default:
        throw new Error("Invalid controller");
    }
  };
}
