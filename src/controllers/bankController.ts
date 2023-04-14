import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { Bank } from "../models/bank";

export class BankController extends Controller {
  constructor() {
    super(Bank);
  }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const student = await this.model.getAll();
            res.status(200).json(student);
        } catch (err) {
            next(err);
        }
    }
}