import { Request, Response, NextFunction } from "express";
import { SheetInstance } from "../models/sheetInstance";
import { Sheet } from "../models/sheet";
import checkAnswers from "../utils/correct" ;

let now = new Date();

export class SheetInstanceController {

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.sheetId as string;
            const data = await SheetInstance.getAll(id);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = req.params.id as string;
          const data = await SheetInstance.get(id);
          res.status(200).json(data);
        } catch (error) {
          next(error);
        }
    };
    
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await SheetInstance.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    async createMany(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await SheetInstance.createMany(req.body);
            res.status(201).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getSheetByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.studentId as string || req.query.studentId as string;
            if (!id) {
                return res.status(400).json({ message: "studentId is required" });
            }
            const data = await SheetInstance.getStudentAll(id);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = req.params.id as string || req.query.studentId as string;
          const verify = await SheetInstance.get(id);
            if (!verify) {
                return res.status(404).json({ message: "SheetInstance not found" });
            }
          const {
            answers,
            result,
            started,
            givenTime,
            finished    
          } = req.body;
            // check if the sheet is started, enter the start time and the supposed end time
          if (started && started === true && verify.started === false) {
            const given = (1 || givenTime )* 60 * 60 * 1000;
            const end = new Date(now.getTime() + given);
            const data = await SheetInstance.update(id, {
                started: true,
                startTime: now,
                endTime: end,
            });
            return res.status(200).json(data);
            // check if the sheet is finished, re-enter the final time and calculate the result
            } 
            else if (finished && finished === true && verify.finished === false && verify.started === true && new Date(now.getTime()) < new Date(verify.endTime?.getTime() || 0)) {
                // validate the answers and calculate the result
                const modelAnswers = await Sheet.get(verify.sheetId);
                const result = checkAnswers(req.body.answers, modelAnswers?.questions);
                if (!result) { 
                    return res.status(400).json({
                        message: "error occurred while calculating the result"
                    })
                }
                const data = await SheetInstance.update(id, {
                    finished: true,
                    endTime: new Date(now.getTime()),
                    result: result
                });
                return res.status(200).json(data);
            // check if the sheet is already answered, if not, update the answers
            } else if (answers && verify.finished === false && verify.started === true && new Date(now.getTime()) < new Date(verify.endTime?.getTime() || 0)) {
                const data = await SheetInstance.update(id, req.body);
                return res.status(200).json(data);
            }

          return res.status(400).json({ message: "SheetInstance alredy answered or time has passed, return to your professor for assistance!" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
    
    delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const data = await SheetInstance.delete(id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
    };

}