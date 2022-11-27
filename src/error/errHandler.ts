import { NextFunction, Request, Response } from "express";

interface IToken {
    [key: string]: number;
}
  
const errors: IToken = {
    "Missng credentials": 401,
    "Incorrect username or password": 401,
    "email is required": 400,
    "password and confirm password must match": 400,
    "token is required": 400,
    "Invalid token": 401,
};

function errMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log("Middleware Error Hadnling");
    if (err.message && err.message in Object.keys(errors)) {
        return res.status(errors[err.message]).json({ error: err.message });
    }
    console.log(err);
    next();
}

export default errors;