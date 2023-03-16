import { Student } from "../models/student";
import { User } from "../models/user";
import { getStudentInputs, getUserInputs } from "../utils/mapAdmissionData";
import { Student as StudentModel, User as UserModel } from "@prisma/client";
import { Department } from "../models/department";
import { DepartmentService } from "./department";
import { Program } from "../models/programs/program";
import { ProgramCourse } from "../models/programs/programCourse";
import { CourseInstance } from "../models/courseInstance";

const entryFilter = (obj: any) => {
  if (!obj.nationalId || obj.nationalId.length != 14) {
    return false;
  }
  return true;
};

const connectClasses = (classes: string[]) => {
  return {
    connect: classes.map((id) => ({ id })),
  };
};

const connectOrCreateAvailableCourses = (
  studentId: string,
  programCourses: any[]
) => {
  const coursesWithoutPrereq = programCourses.filter(
    (course) => course.prerequisites.length == 0
  );

  return {
    connectOrCreate: coursesWithoutPrereq.map((course) => ({
      where: {
        programCourseId_studentId: {
          programCourseId: course.id,
          studentId: studentId,
        },
      },
      create: {
        englishName: course.englishName,
        arabicName: course.arabicName,
        code: course.code,
        levelId: course.levelId,
        finished: false,
        programCourseId: course.id,
        unlocked: true,
      },
    })),
  };
};

export class StudentService {
  static createMany = async (
    collegeId: string,
    departmentId: string,
    jsonData: any[]
  ) => {
    const filteredData = jsonData.filter(entryFilter);
    const usersInputs = getUserInputs(filteredData);
    let departmentCode;
    let programId;
    await User.createMany(usersInputs);
    if (departmentId) {
      const department = await Department.getAdmission(departmentId);
      departmentCode = department?.code;
      programId = department?.programs[0]?.id;
    }
    const studentsInputs = getStudentInputs(
      filteredData,
      collegeId,
      departmentCode,
      programId
    );
    await Student.createMany(studentsInputs);
  };

  static get = async (id: string) => {
    return await Student.get(id);
  };

  static setStudentProgramAndAvailableCourses = async (
    id: string,
    programId: string | undefined
  ) => {
    // set student's program to the given program and add program courses to student's available courses
    const programCourses = await ProgramCourse.getAllWithPrerequisites(
      programId as string
    );

    return await Student.update(id, {
      Program: { connect: { id: programId } },
      availableCourses: connectOrCreateAvailableCourses(id, programCourses),
    });
  };

  static getStudentAvailableCourses = async (studentId: string) => {
    const student = await Student.getStudentWithAvailableCourses(studentId);
    if (!student?.availableCourses.length) {
      this.setStudentProgramAndAvailableCourses(
        studentId,
        student?.programId as string
      );
      return (await Student.getStudentWithAvailableCourses(studentId))
        ?.availableCourses;
    }
    return student?.availableCourses;
  };

  static getStudentAvailableClasses = async (
    semesterId: string,
    studentId: string
  ) => {
    const availableCourses = (
      await this.getStudentAvailableCourses(studentId)
    )?.map((course) => course.programCourseId);

    const classes = await CourseInstance.getStudentAvailableClasses(
      semesterId,
      availableCourses
    );
    return classes;
  };

  static moveStudentToNextProgram = async (studentId: string) => {
    const student = await Student.getStudentWithDepartmentAndProgram(studentId);
    let currProgram = student?.Program;
    const departmentId = student?.department?.id;

    if (!currProgram) {
      const firstProgram = await DepartmentService.getDepartmentFirstProgram(
        departmentId
      );
      return await this.setStudentProgramAndAvailableCourses(
        studentId,
        firstProgram.id
      );
    }

    if (
      currProgram.system === "CREDIT" &&
      student?.creditHrs &&
      currProgram.hrsToPass &&
      student.creditHrs >= currProgram.hrsToPass
    ) {
      currProgram = await Program.getNextProgram(departmentId, currProgram.id);
      if (currProgram?.id) {
        return await this.setStudentProgramAndAvailableCourses(
          studentId,
          currProgram?.id
        );
      }
    }
    return student;
  };

  static changeStudentDepartment = async (
    studentId: string,
    departmentId: string
  ) => {
    const student = await Student.getStudentWithDepartmentAndProgram(studentId);
    let currProgram = student?.Program;
    const department = await Department.get(departmentId);

    if (!department || !currProgram) {
      this.update(studentId, {
        department: { connect: { id: departmentId } },
      });
      return;
    }

    while (
      currProgram &&
      !department.programs.some((p) => p.id === currProgram?.id)
    ) {
      currProgram = await Program.getPrerequisiteProgram(currProgram.id);
    }

    this.update(studentId, {
      department: { connect: { id: departmentId } },
      Program: { connect: { id: currProgram?.id } },
    });
  };

  static getStudentTable = async (
    studentId: string,
    academicSemesterId: string
  ) => {
    return await Student.getStudentTable(studentId, academicSemesterId);
  };

  static studentRegister = async (
    studentId: string,
    academicSemesterId: string,
    data: any
  ) => {
    return await Student.studentRegister(studentId, academicSemesterId, data);
  };

  static updateStudentRegister = async (tableId: string, data: any) => {
    return await Student.updateStudentRegister(tableId, data);
  };

  static getAll = async (collegeId: string) => {
    return await Student.getAll(collegeId);
  };

  static getAllByProgram = async (programId: string) => {
    return await Student.getAllByProgram(programId);
  };

  static create = async (data: StudentModel & UserModel) => {
    return await Student.create(data);
  };

  static update = async (id: string, data: any) => {
    return await Student.update(id, data);
  };

  static delete = async (id: string) => {
    return await Student.delete(id);
  };
}
