import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Controller } from "./controller";

const SECRET = process.env.JWT_SECRET as string;
const DOMAIN = process.env.DOMAIN as string;

export class AcquireController extends Controller {
    /**
     * obtain your email and set the password, this works for the first time only
     * if required to do it again, you can do it by contacting the faculty admin
     * 
     * obtain: POST method takes the national id and checks if it exists in the database
     * if it exists, it returns the email address along with a link to set the password
     * and set the obtained boolean to true
     */

    constructor() {
        super(User);
    }

    obtain = async (req: Request, res: Response, next: NextFunction) => {

        // get the id from the request body and check if it exists
        const id = req.body.nationalId;
        if (!id) {
            return next({
                status: 400,
                message: "National Id is required",
            });
        }

        try {
            const user = await this.model.get_nationalId(id);
            // check if the user exists
            if (!user) {
                return next({
                    status: 400,
                    message: "user not found",
                });
            } else {
                // disabled for testing purposes
                // check if the user has already obtained the credentials
                // if (user.obtained) {
                //     return next({
                //         status: 400,
                //         message: "You have already obtained your credentials",
                //     });
                // }
                // issue the reset password token
                const token = jwt.sign(
                    {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    },
                    SECRET + user.password,
                    { expiresIn: "2d" }
                );
                const url = `${DOMAIN}/api/auth/reset_password/${token}`;
                // console.log(url);
                // update the obtained boolean to true
                await this.model.update({
                    email: user.email,
                    obtained: true
                });
                // return the email and the link to set the password
                res.json({ 
                    nationalId: user.nationalId,
                    email: user.email,
                    token
                 });
            }
        } catch (error) {
            next(error);
        } 
    }
}