import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { Question } from "../models/question";

export class QuestionController extends Controller {

  constructor() {
    super(Question);
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
}