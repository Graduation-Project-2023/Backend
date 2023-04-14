import { Request, Response, NextFunction } from "express";
import { Controller } from "./controller";
import { Student } from "../models/student";


export class StudentInfoController extends Controller {
    /**
     * get the student info, gets the student id from the request body
     * and returns the student info, requires the student to be logged in
     * to perform this action
     */
    constructor() {
        super(Student);
    }

    get_info = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.query.studentId;
            if (!id) {
                return next({
                    status: 400,
                    message: "Student Id is required",
                });
            }
            const student = await this.model.get(id);
            res.status(200).json(student);
        } catch (err) {
            next(err);
        }
    }

}