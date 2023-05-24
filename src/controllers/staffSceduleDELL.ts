import { Request, Response, NextFunction } from "express";
import { staffSchedules1, staffSchedules2 } from "../deleteASAP/bullshit";
import jwt, { JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

export class Schedule {
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // get user id from token
            const authHeader = req.headers["authorization"];
            if (!authHeader) {
                return res.status(401).json({ err: "No token provided" });
            }
            const token = authHeader.split(" ")[1] as string;
            // console.log(token);
            let decoded = jwt.verify(token, SECRET) as JwtPayload;
            // console.log(decoded);
            if (decoded.role !== "PROFESSOR") {
                return res.status(401).json({ err: "Schedules are only for professors" });
            }

            if (decoded.id === "f56a05fc-4bc8-4ddf-a653-fc87c8de3dbf" || decoded.id === "12cc473a-08ed-4c4e-986a-15fc4d75a3b5") {
                return res.status(200).json({ courses: staffSchedules1});
            }
            if (decoded.id === "8dc2a88d-0353-4031-bac6-a01dd070fb75") {
                return res.status(200).json({ courses: staffSchedules2});
            }
            return res.status(200).json({
                courses: 'professor has no schedules for now!'
            })
            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}