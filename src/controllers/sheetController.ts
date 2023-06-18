import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { Sheet } from "../models/sheet";

export class SheetController extends Controller {

  constructor() {
    super(Sheet);
  }

    getForStudent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            const sheet = await this.model.get(id);
            const updatedData = {
              ...sheet,
              questions: sheet.questions.map((question: { [x: string]: any; answer: any; }) => {
                const { answer, ...rest } = question;
                return rest;
              })
            };
            res.status(200).json(updatedData);
        } catch (err) {
            next(err);
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bankId = req.params.bankId as string;
            const student = await this.model.getAll(bankId);
            res.status(200).json(student);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    addQuestions = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const {sheetId, questionId} = req.body;
          const sheet = await this.model.addQuestions(sheetId, questionId);
          res.status(200).json(sheet);
        } catch (err) {
          console.log(err);
          next(err);
        }
    }

    removeQuestions = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const {sheetId, questionId} = req.body;
          const sheet = await this.model.removeQuestions(sheetId, questionId);
          res.status(200).json(sheet);
        } catch (err) {
          console.log(err);
          next(err);
        }
    }
}