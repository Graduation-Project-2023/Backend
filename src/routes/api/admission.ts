import express, { NextFunction, Request, Response } from "express";
import { StudentRepo } from "../../db/studentRepo";
import csv from "csvtojson";
import multer from "multer";
import path from "path";
import { GENDER, RELIGION } from "@prisma/client";

const server = express.Router();
const student = new StudentRepo();
let HD: string[] = [];
const studenterrs: string[] = [];
let G: GENDER;
let R: RELIGION;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

server.post(
  "/csv_upload",
  upload.single("csv"),
  (req: Request, res: Response, next: NextFunction) => {
    // check if file exist
    if (!req.file) return res.status(400).json({ error: "File is required" });
    // check if file is csv
    if (req.file?.mimetype !== "text/csv")
      return res.status(400).json({ error: "File must be a csv" });
    try {
      const csvFilePath = `${req.file.path}`;
      csv()
        .fromFile(csvFilePath)
        .then(async (jsonObj) => {
          HD = Object.keys(jsonObj[0]);
          if (
            HD[3] != "englishName" ||
            HD[4] != "arabicName" ||
            HD[5] != "nationality" ||
            HD[6] != "nationalId" ||
            HD[7] != "gender" ||
            HD[8] != "religion" ||
            HD[9] != "birthDate" ||
            HD[10] != "birthPlace" ||
            HD[11] != "guardianName" ||
            HD[12] != "address" ||
            HD[13] != "contactPhone" ||
            HD[14] != "homePhone"
          ) {
            return next({
              error: "File has incorrect order of data",
            });
          }
          for (let i = 0; i < jsonObj.length; i++) {
            if (!jsonObj[i].nationalId || jsonObj[i].nationalId.length != 14) {
              studenterrs.push(`Student ${i + 1} has invalid national id`);
            } else {
              if (jsonObj[i].gender == "ذكر") jsonObj[i].gender = "MALE";
              else jsonObj[i].gender = "FEMALE";
              if (jsonObj[i].religion == "مسلم") jsonObj[i].religion = "MUSLIM";
              else jsonObj[i].religion = "CHRISTIAN";
              await student.create({
                user: {
                  create: {
                    email: `keep.hard.coded${i + 56}@fornow.com`,
                    password: "cbhbdhd",
                    role: "STUDENT",
                  },
                },
                englishName: jsonObj[i].englishName,
                arabicName: jsonObj[i].arabicName,
                nationality: jsonObj[i].nationality,
                nationalId: jsonObj[i].nationalId,
                gender: jsonObj[i].gender,
                religion: jsonObj[i].religion,
                birthDate: new Date(jsonObj[i].date),
                birthPlace: jsonObj[i].birthPlace,
                guardianName: jsonObj[i].guardianName,
                address: jsonObj[i].address,
                contactPhone: jsonObj[i].contactPhone,
                homePhone: jsonObj[i].homePhone,
              });
            }
          }
          res.status(200).send(studenterrs);
        });
    } catch (err) {
      next(err);
    }
  }
);

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
    } = req.body;
    if (!nationalId || nationalId.length != 14)
      next({ error: "missing or invalid nationalId" });
    try {
      if (gender == "ذكر") G = "MALE";
      else G = "FEMALE";
      if (religion == "مسلم") R = "MUSLIM";
      else R = "CHRISTIAN";
      await student.create({
        user: {
          create: {
            email: "keep.hard.codedde4e3@fornow.com",
            password: "dummy",
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
      });
      return res.status(200).json({ message: "user created" });
    } catch (err) {
      next({ message: err });
    }
  }
);

export default server;
