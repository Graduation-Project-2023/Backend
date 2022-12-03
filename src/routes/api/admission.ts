import express, { NextFunction, Request, Response } from "express";
import { StudentRepo } from "../../db/studentRepo";
import csv from "csvtojson";
import multer from "multer";
import path from "path";
import { GENDER, Prisma, RELIGION, Student } from "@prisma/client";
import bcrypt from "bcrypt";
import { uploadSingle, validateCsv, csvToJson } from "../../middleware/csv";

const server = express.Router();
const studentRepo = new StudentRepo();
let G: GENDER;
let R: RELIGION;

const mapCsvRowToStudentCreateInput = (
  obj: any
): Prisma.StudentCreateInput | null => {
  if (!obj.nationalId || obj.nationalId.length !== 14) {
    return null;
  }
  let studentInput: any = {
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
      password: bcrypt.hashSync("123456789" + process.env.PEPPER, 13),
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
      const students = jsonData.map(mapCsvRowToStudentCreateInput);
      // create all students in parallel
      await Promise.all(
        students.map(async (student: Prisma.StudentCreateInput) => {
          if (!student) {
            return;
          }
          try {
            await studentRepo.create({
              ...student,
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

// server.post(
//   "/csv_upload",
//   upload.single("csv"),
//   (req: Request, res: Response, next: NextFunction) => {
//     // check if file exist
//     if (!req.file)
//       return next({
//         status: 400,
//         message: "File is required",
//       });
//     // check if file is csv
//     if (req.file?.mimetype !== "text/csv")
//       return next({
//         status: 400,
//         message: "File must be a csv",
//       });
//     try {
//       const csvFilePath = `${req.file.path}`;
//       csv()
//         .fromFile(csvFilePath)
//         .then(async (jsonObj) => {
//           for (let i = 0; i < jsonObj.length; i++) {
//             if (!jsonObj[i].nationalId || jsonObj[i].nationalId.length != 14) {
//               studenterrs.push(`Student ${i + 1} has invalid national id`);
//             } else {
//               if (jsonObj[i].gender == "ذكر") jsonObj[i].gender = "MALE";
//               else jsonObj[i].gender = "FEMALE";
//               if (jsonObj[i].religion == "مسلم") jsonObj[i].religion = "MUSLIM";
//               else jsonObj[i].religion = "CHRISTIAN";
//               await studentRepo.create({
//                 user: {
//                   create: {
//                     email: `${jsonObj[i].nationalId}@eng.suez.edu.com`,
//                     password: bcrypt.hashSync(
//                       "123456789" + process.env.PEPPER,
//                       13
//                     ),
//                     role: "STUDENT",
//                   },
//                 },
//                 englishName: jsonObj[i].englishName,
//                 arabicName: jsonObj[i].arabicName,
//                 gender: jsonObj[i].gender,
//                 religion: jsonObj[i].religion,
//                 nationality: jsonObj[i].nationality,
//                 birthDate: new Date(jsonObj[i].birthDate),
//                 nationalId: jsonObj[i].nationalId,
//                 enrollmentYear: new Date(jsonObj[i].enrollmentYear),
//                 address: jsonObj[i].address,
//                 homePhone: jsonObj[i].homePhone,
//                 birthPlace: jsonObj[i].birthPlace,
//                 guardianName: jsonObj[i].guardianName,
//                 contactPhone: jsonObj[i].contactPhone,
//                 PreviousQualification: jsonObj[i].PreviousQualification,
//                 TotalPreviousQualification:
//                   jsonObj[i].TotalPreviousQualification,
//                 InstitutePreviousQualification:
//                   jsonObj[i].InstitutePreviousQualification,
//                 schoolMarks: jsonObj[i].schoolMarks,
//                 schoolSeatId: jsonObj[i].schoolSeatId,
//                 collegeCode: jsonObj[i].collegeCode,
//                 directorate: jsonObj[i].directorate,
//               });
//             }
//           }
//           return next({
//             status: 200,
//             message: studenterrs,
//           });
//         });
//       studenterrs.length = 0;
//     } catch (err) {
//       next({
//         status: 400,
//         message: err,
//       });
//     }
//   }
// );

server.get("/csv_upload", (req: Request, res: Response) => {
  res.status(200).sendFile(__dirname + "/form.html");
});

server.post(
  "/create_user",
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      englishName,
      arabicName,
      nationality,
      nationalId,
      gender,
      religion,
      birthDate,
      birthPlace,
      guardianName,
      address,
      contactPhone,
      homePhone,
      enrollmentYear,
      PreviousQualification,
      TotalPreviousQualification,
      InstitutePreviousQualification,
      schoolMarks,
      schoolSeatId,
      collegeCode,
      directorate,
    } = req.body;
    if (!nationalId || nationalId.length != 14)
      next({
        status: 400,
        message: "missing or invalid nationalId",
      });
    try {
      if (gender == "ذكر") G = "MALE";
      else G = "FEMALE";
      if (religion == "مسلم") R = "MUSLIM";
      else R = "CHRISTIAN";
      await studentRepo.create({
        user: {
          create: {
            email: `${nationalId}@eng.suez.edu.com`,
            password: bcrypt.hashSync("123456789" + process.env.PEPPER, 13),
            role: "STUDENT",
          },
        },
        englishName,
        arabicName,
        nationality,
        nationalId,
        gender: G,
        religion: R,
        birthDate: new Date(birthDate),
        birthPlace,
        guardianName,
        address,
        contactPhone,
        homePhone,
        enrollmentYear,
        PreviousQualification,
        TotalPreviousQualification,
        InstitutePreviousQualification,
        schoolMarks,
        schoolSeatId,
        collegeCode,
        directorate,
      });
      return next({
        status: 200,
        message: "Students created successfully",
      });
    } catch (err) {
      next({
        status: 400,
        message: err,
      });
    }
  }
);

export default server;
