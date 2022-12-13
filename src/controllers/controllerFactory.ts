import { Controller } from "./controller";
import { CourseController } from "./courseController";
import { ProgramController } from "./programController";
import { CollegeController } from "./collegeController";
import { ProgramCourseController } from "./programCourseController";
import { ProgramRelationsController } from "./programRelationsController";
import {
  Level,
  Grade,
  LevelAllowedHours,
  GpaAllowedHours,
} from "../models/programs/programRelations";

export class ControllerFactory {
  static getController = (controller: string): Controller => {
    switch (controller) {
      case "course":
        return new CourseController();
      case "program":
        return new ProgramController();
      case "college":
        return new CollegeController();
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
      default:
        throw new Error("Invalid controller");
    }
  };
}
