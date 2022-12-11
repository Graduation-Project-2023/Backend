import express, { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../../db";
import bcrypt from "bcrypt";
import { uploadSingle, validateCsv, csvToJson } from "../../middleware/csv";

const server = express.Router();

const mapCsvRowToStudentCreateInput = async (
  obj: any
): Promise<Prisma.StudentCreateInput | null> => {
  if (!obj.nationalId || obj.nationalId.length !== 14) {
    return null;
  }
  const studentInput: any = {
    nationalId: obj.nationalId,
  };
  if (obj.collegeId) {
    studentInput.college = {
      connect: {
        id: obj.collegeId,
      },
    };
  }
  studentInput.user = {
    create: {
      email: `${obj.nationalId}@eng.suez.edu.com`,
      password: await bcrypt.hash(obj.nationalId + process.env.PEPPER, 10),
      role: "STUDENT",
    },
  };
  studentInput.englishName = obj.englishName;
  studentInput.arabicName = obj.arabicName;
  studentInput.nationality = obj.nationality;
  studentInput.gender = obj.gender?.includes("ذ") ? "MALE" : "FEMALE";
  studentInput.religion = obj.religion?.includes("مسلم")
    ? "MUSLIM"
    : "CHRISTIAN";
  studentInput.birthDate = obj.birthDate ? new Date(obj.birthDate) : undefined;
  studentInput.birthPlace = obj.birthPlace;
  studentInput.guardianName = obj.guardianName;
  studentInput.contactPhone = obj.contactPhone;
  studentInput.homePhone = obj.homePhone;
  studentInput.address = obj.address;
  studentInput.schoolSeatId = obj.schoolSeatId;
  studentInput.schoolMarks = obj.schoolMarks;
  studentInput.enrollmentYear = obj.enrollmentYear
    ? new Date(obj.enrollmentYear)
    : undefined;
  studentInput.PreviousQualification = obj.PreviousQualification;
  studentInput.TotalPreviousQualification = obj.TotalPreviousQualification;
  studentInput.InstitutePreviousQualification =
    obj.InstitutePreviousQualification;
  studentInput.directorate = obj.directorate;
  return studentInput;
};

server.post(
  "/csv_upload",
  uploadSingle,
  validateCsv,
  csvToJson,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jsonData } = req.body;
      // map csv data to student create input in parallel due to async nature of bcrypt
      const studentInputs = await Promise.all(
        jsonData.map(mapCsvRowToStudentCreateInput)
      );
      // create all students in parallel
      await Promise.all(
        studentInputs.map(async (student: Prisma.StudentCreateInput) => {
          if (!student) {
            return;
          }
          try {
            await prisma.student.create({
              data: student,
            });
          } catch (err) {
            console.error(err);
          }
        })
      );
      res.status(201).send("OK");
    } catch (error) {
      return next({
        status: 400,
        message: "File is not in the correct format",
      });
    }
  }
);

server.post(
  "/create_student",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, collegeId, ...student } = req.body;
      await prisma.student.create({
        data: {
          user: {
            create: {
              email,
              password: await bcrypt.hash(password + process.env.PEPPER, 10),
              role: "STUDENT",
            },
          },
          college: {
            connect: {
              id: collegeId,
            },
          },
          ...student,
        },
      });
      res.status(201).send("OK");
    } catch (error) {
      return next(error);
    }
  }
);

export default server;
