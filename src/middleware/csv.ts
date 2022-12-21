import express, { NextFunction, Request, Response } from "express";
import csv from "csvtojson";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const uploadSingle = upload.single("csv");

export const validateCsv = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file || req.file.mimetype !== "text/csv") {
    next({
      status: 400,
      message: "Invalid file",
    });
  }
  next();
};

export const csvToJson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const csvFilePath = req.file?.path || "";
    const jsonData = await csv().fromFile(csvFilePath);
    req.body.jsonData = jsonData;
    next();
  } catch (err) {
    next(err);
  }
};
