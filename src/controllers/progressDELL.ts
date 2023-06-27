import { Request, Response, NextFunction } from "express";
import { testingCourses } from "../deleteASAP/bullshit";

export class Progress {
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const studentId = req.query.studentId as string;
        if (!studentId || studentId !== "698b2eed-b652-4246-bdbc-610da8b67cb5") {
            res.status(200).json({
                courses: 'student has no current progress!'
            })
        }
        res.status(200).json({ courses: testingCourses});
        } catch (err) {
        console.log(err);
        next(err);
        }
    }
}